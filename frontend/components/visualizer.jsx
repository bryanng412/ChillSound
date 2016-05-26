var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');
var VisualizerStore = require('../stores/visualizer_store.js');

var Visualizer = React.createClass({
  getInitialState: function() {
    this.particles = [];

    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth/window.innerHeight,
      1,
      4000
    );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer();
    document.body.appendChild(this.renderer.domElement);

    this.createWalls();
    this.createParticles();
    this.updateParticles();

    return { songUrl: VisualizerStore.songUrl() };
  },

  createWalls: function() {
    var floor;
    var geometry = new THREE.PlaneBufferGeometry(20000, 30000);
    var material = new THREE.MeshPhongMaterial({
       color: 0xffffff,
       shininess: 100,
       specular: 0xffffff
     });

    floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = false;
    floor.rotation.x = -19 * Math.PI / 36.0;
    floor.position.y = -400;

    var leftWall = new THREE.Mesh(geometry, material);
    leftWall.receiveShadow = false;
    leftWall.rotation.y = 19 * Math.PI / 36.0;
    leftWall.rotation.z = Math.PI / 2.0;
    leftWall.position.x = -1300;

    var rightWall = new THREE.Mesh(geometry, material);
    rightWall.receiveShadow = false;
    rightWall.rotation.y = -19 * Math.PI / 36.0;
    rightWall.rotation.z = Math.PI / 2.0;
    rightWall.position.x = 1300;

    this.scene.add(floor);
    this.scene.add(leftWall);
    this.scene.add(rightWall);
  },

  createParticles: function() {
    var light;
    var geometry = new THREE.SphereGeometry(4,8,8);
    var material = new THREE.MeshPhongMaterial({
       color: 0xffffff,
       shininess: 50,
       specular: 0xffffff
     });
      // 0x06ee01
    for (var zPos = -1000; zPos < 1000; zPos+=31.25) {
      light = new THREE.PointLight(0xffffff, 1, 550, 1);
      light.castShadow = false;

      light.add(new THREE.Mesh(geometry, material));
      light.position.x = Math.random() * 2000 - 1000;
      light.position.y = Math.random() * 700 - 150;
      light.position.z = zPos;
      this.scene.add(light);
      this.particles.push(light);
    }

    this.zInc = 2;
  },

  updateParticles: function() {
    console.log("low " + this.lowFreq);
    console.log("mid " + this.midFreq);
    console.log("high " + this.highFreq);


    if ((this.lowFreq > 750) || (this.midFreq < 10000)) {
      this.zInc += 5;
    } else {
      this.zInc -= 1;
    }
    if (this.zInc < 2) {
      this.zInc = 2;
    } else if (this.zInc > 60) {
      this.zInc = 60;
    }

    this.requestId = window.requestAnimationFrame(this.updateParticles);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth/window.innerHeight;
    for (var i=0; i<this.particles.length; i++) {
      // var freqSample;
      // if (this.dataArray) {
      //   freqSample = this.dataArray[i*2] + this.dataArray[i*2 + 1];
      // } else {
      //   freqSample = this.volume;
      // }

      if (this.midFreq > 7000) {
        // this.particles[i].intensity = 0.2 + Math.sin(this.highFreq) * Math.sin(this.highFreq);
        this.particles[i].intensity += 0.01;
      } else {
        this.particles[i].intensity -= 0.01;
      }

      if (this.particles[i].intensity > 1) {
        this.particles[i].intensity = 1;
      } else if (this.particles[i].intensity < 0.5) {
        this.particles[i].intensity = 0.5;
      }

      var r, g, b;
      if ((this.lowFreq < 750) || !this.lowFreq) {
        this.particles[i].color = new THREE.Color(0x06ee01);
        //  this.particles[i].color = new THREE.Color(0x06ee01);
      } else {
        r = Math.floor(Math.sin(this.highFreq) * Math.sin(this.highFreq) * 255);
        g = Math.floor(Math.cos(this.midFreq) * Math.cos(this.midFreq) * 128);
        b = Math.floor((Math.cos(this.lowFreq) + 1) * 100);
        this.particles[i].color =
          new THREE.Color("rgb(" + r + "," + g + "," + b + ")");
      }


      this.particles[i].position.z += this.zInc;

      if (this.particles[i].position.z > 1000) {
        this.particles[i].position.x = Math.random() * 2000 - 1000;
        this.particles[i].position.y = Math.random() * 700 - 150;
        this.particles[i].position.z -= 2500;
      }
    }
    this.renderer.render(this.scene, this.camera);
  },

  componentDidMount: function() {
    this.listenerToken = VisualizerStore.addListener(this._onSongStart);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
    window.cancelAnimationFrame(this.requestId);
    clearInterval(this.refreshIntervalId);
    document.body.removeChild(this.renderer.domElement);
  },

  _onSongStart: function() {
    // this.setState({ songUrl: VisualizerStore.songUrl() });
    var player = document.getElementById("player");
    // player.crossOrigin = "anonymous";
    //different for multiple browsers
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var analyser = audioCtx.createAnalyser();
    //Fast Fourier Transform size, must be power of 2
    analyser.fftSize = 256;
    //half the fft size, number of bins
    var bufferLength = analyser.frequencyBinCount;

    //hook <audio> element up with ctx
    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    //continously sample audio
    this.refreshIntervalId = setInterval(function() {
      //samples the audio data and
      //updates the dataArray and volume in real time
      analyser.getByteFrequencyData(this.dataArray);
      var low = 0;
      var mid = 0;
      var high = 0;
      //volume of first 80 bins, play around with this
      for (var i=0; i<5; i++) {
        low += this.dataArray[i];
      }

      for (var i=5; i<65; i++) {
        mid += this.dataArray[i];
      }

      for (var i=65; i<this.dataArray.length; i++) {
        high += this.dataArray[i];
      }

      this.lowFreq = low;
      this.midFreq = mid;
      this.highFreq = high;
    }.bind(this), 20);
    //use these in animations
    //size is fftSize/2
    this.dataArray = new window.Uint8Array(bufferLength);
    this.lowFreq = 0;
    this.midFreq = 0;
    this.highFreq = 0;
  },

  render: function() {
    return <div/>;
  }

});

module.exports = Visualizer;
