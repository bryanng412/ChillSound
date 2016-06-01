var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');
var VisualizerStore = require('../stores/visualizer_store.js');

var Visualizer = React.createClass({
  getInitialState: function() {
    this.particles = [];
    this.lights = [];
    this.bars = [];

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
    this.createBars();
    this.updateObjects();

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
    floor.rotation.x = -19 * Math.PI / 36.0;
    floor.position.y = -400;

    var leftWall = new THREE.Mesh(geometry, material);
    leftWall.rotation.y = 19 * Math.PI / 36.0;
    leftWall.rotation.z = Math.PI / 2.0;
    leftWall.position.x = -1300;

    var rightWall = new THREE.Mesh(geometry, material);
    rightWall.rotation.y = -19 * Math.PI / 36.0;
    rightWall.rotation.z = Math.PI / 2.0;
    rightWall.position.x = 1300;

    this.scene.add(floor);
    this.scene.add(leftWall);
    this.scene.add(rightWall);
  },

  createParticles: function() {
    // var light;
    var particle;
    var geometry = new THREE.SphereGeometry(4,8,8);
    var material = new THREE.MeshPhongMaterial({
       color: 0xffffff,
       shininess: 50,
       specular: 0xffffff
     });
      // 0x06ee01
    for (var zPos = -1000; zPos < 1000; zPos+=31.25) {
      // light = new THREE.PointLight(0xffffff, 1, 550, 1);
      // light.castShadow = false;
      //
      // light.add(new THREE.Mesh(geometry, material));
      particle = new THREE.Mesh(geometry, material);
      particle.position.x = Math.random() * 2000 - 1000;
      particle.position.y = Math.random() * 700 - 150;
      particle.position.z = zPos;
      this.scene.add(particle);
      this.particles.push(particle);
    }

  },

  createBars: function() {
    var light, bar;
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    var material = new THREE.MeshNormalMaterial();
    // var material = new THREE.MeshPhongMaterial({
    //    color: 0xffffff,
    //    shininess: 50,
    //    specular: 0xffffff
    //  });

    var xPos = -925;
    for (var i=0; i<32; i++) {
      light = new THREE.PointLight(0xffffff, 1, 600, 1);
      bar = new THREE.Mesh(geometry, material);

      light.position.x = xPos + 25;
      light.position.y = -390;
      // light.position.z = -100;

      bar.position.x = xPos;
      bar.position.y = -390;

      xPos += 60;

      this.scene.add(light);
      this.scene.add(bar);
      this.lights.push(light);
      this.bars.push(bar);
    }
  },

  updateObjects: function() {
    window.requestAnimationFrame(this.updateObjects);
    this.updateParticles();
    this.updateBars();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth/window.innerHeight;
  },
  updateParticles: function() {
    // if ((this.lowFreq < 1600) ||
    //     ((this.midFreq < 8500) && (this.lowFreq > 1600))) {
    //   this.zInc -= 1;
    // } else {
    //   this.zInc += 5;
    // }
    // if (this.zInc < 2) {
    //   this.zInc = 2;
    // } else if (this.zInc > 60) {
    //   this.zInc = 60;
    // }

    var zInc = 2;
    for (var i=0; i<this.particles.length; i++) {

      // if (this.particles[i].intensity > 1) {
      //   this.particles[i].intensity = 1;
      // } else if (this.particles[i].intensity < 0.4) {
      //   this.particles[i].intensity = 0.4;
      // }

      // var r, g, b;
      // if ((this.midFreq < 8000) || !this.midFreq) {
      //   this.particles[i].color = new THREE.Color(0x06ee01);
      //   //  this.particles[i].color = new THREE.Color(0x06ee01);
      // } else {
      //   r = Math.floor(Math.sin(this.highFreq) * Math.sin(this.highFreq) * 255);
      //   g = Math.floor(Math.cos(this.midFreq) * Math.cos(this.midFreq) * 128);
      //   b = Math.floor((Math.cos(this.lowFreq) + 1) * 100);
      //   this.particles[i].color =
      //     new THREE.Color("rgb(" + r + "," + g + "," + b + ")");
      // }


      this.particles[i].position.z += zInc;

      if (this.particles[i].position.z > 1000) {
        this.particles[i].position.x = Math.random() * 2000 - 1000;
        this.particles[i].position.y = Math.random() * 700 - 150;
        this.particles[i].position.z -= 2500;
      }
    }
    this.renderer.render(this.scene, this.camera);
  },

  updateBars: function() {
    if (this.dataArray) {
      for (var i=0; i<this.bars.length; i++) {
        var yScale = (this.dataArray[i] / 255) * 40 + 1;
        var lightInt = (this.dataArray[i] / 255) * 1;
        this.bars[i].scale.set(1, yScale, 1);
        this.lights[i].position.y = yScale;
        this.lights[i].intensity = lightInt;
      }
    }
  },

  componentDidMount: function() {
    this.listenerToken = VisualizerStore.addListener(this._onSongStart);
  },

  _onSongStart: function() {
    // this.setState({ songUrl: VisualizerStore.songUrl() });
    var player = document.getElementById("player");
    // player.crossOrigin = "anonymous";
    //different for multiple browsers
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var analyser = audioCtx.createAnalyser();
    //Fast Fourier Transform size, must be power of 2
    analyser.fftSize = 64;
    //half the fft size, number of bins
    var bufferLength = analyser.frequencyBinCount;

    //hook <audio> element up with ctx
    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    setInterval(function() {
      analyser.getByteFrequencyData(this.dataArray);
    }.bind(this), 20);

    this.dataArray = new window.Uint8Array(bufferLength);
  },

  render: function() {
    return <div/>;
  }

});

module.exports = Visualizer;
