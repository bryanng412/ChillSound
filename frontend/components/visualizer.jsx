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
      light = new THREE.PointLight(0xffffff, 0.8, 550, 1);
      light.castShadow = false;

      light.add(new THREE.Mesh(geometry, material));
      light.position.x = Math.random() * 2000 - 1000;
      light.position.y = Math.random() * 700 - 150;
      light.position.z = zPos;
      this.scene.add(light);
      this.particles.push(light);
    }
  },

  updateParticles: function() {
    var zInc = this.volume > 12000 ? this.volume * 0.003 : 1;

    this.requestId = window.requestAnimationFrame(this.updateParticles);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth/window.innerHeight;
    for (var i=0; i<this.particles.length; i++) {
      var intensityVal = this.volume > 12000 ? 0.2 + Math.sin(this.volume) * Math.sin(this.volume) : 0.8;
      this.particles[i].intensity = intensityVal;

      var r, g, b;
      if ((this.volume < 12000) || !this.dataArray) {
         this.particles[i].color = new THREE.Color(0x06ee01);
      } else {
        var freqSample = (this.dataArray[i*2] + this.dataArray[i*2 + 1]);
        r = Math.floor(Math.sin(freqSample) * Math.sin(freqSample) * 255);
        g = Math.floor(Math.cos(freqSample) * Math.cos(freqSample) * 128);
        b = Math.floor((Math.cos(freqSample) + 1) * Math.random() * 255);
        this.particles[i].color =
          new THREE.Color("rgb(" + r + "," + g + "," + b + ")");
      }


      this.particles[i].position.z += zInc;

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
      var total = 0;
      //volume of first 80 bins, play around with this
      for (var i = 0; i < 80; i++) {
        total += this.dataArray[i];
      }
      this.volume = total;
    }.bind(this), 35);
    //use these in animations
    //size is fftSize/2
    this.dataArray = new window.Uint8Array(bufferLength);
    this.volume = 0;
  },

  render: function() {
    return <div/>;
  }

});

module.exports = Visualizer;
