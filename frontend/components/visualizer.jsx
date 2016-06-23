var React = require('react');
var ReactDOM = require('react-dom');
var THREE = require('three');
var VisualizerStore = require('../stores/visualizer_store.js');

var Visualizer = React.createClass({
  getInitialState: function() {
    this.particles = [];
    this.lights = [];
    this.bars = [];

    this.colors = [
      0xD40502,
      0xD82707,
      0xDD490C,
      0xE26B11,
      0xE78E16,
      0xECB01B,
      0xF1D220,
      0xF6F526,

      0xD9F43A,
      0xBDF44E,
      0xA1F363,
      0x85F377,
      0x69F38B,
      0x4DF2A0,
      0x31F2B4,
      0x15F2C9,

      0x1AD8CB,
      0x20BFCD,
      0x26A6CF,
      0x2C8DD1,
      0x3173D3,
      0x375AD5,
      0x3D41D7,
      0x4328DA,

      0x4524CD,
      0x4820C1,
      0x4A1CB5,
      0x4D18A9,
      0x4F149C,
      0x521090,
      0x540C84,
      0x540C84
    ];

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
    this.createLights();
    this.createBars();
    this.updateObjects();

    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );

    this.cursorTimer = undefined;

    return { songUrl: VisualizerStore.songUrl() };
  },

  onDocumentMouseMove: function(e) {
    if (this.cursorTimer) {
      window.clearTimeout(this.cursorTimer);
    }

    $('canvas').css({ cursor: 'default' });

    this.cursorTimer = setTimeout(function() {
      $('canvas').css({ cursor: 'none' });
      this.cursorTimer = undefined;
    }, 5000);

    this.mouseX = e.clientX - window.innerWidth/2;
    this.mouseY = e.clientY - window.innerHeight/2;
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
    var particle;
    var geometry = new THREE.SphereGeometry(4,8,8);
    var material = new THREE.MeshPhongMaterial({
       color: 0xffffff,
       shininess: 50,
       specular: 0xffffff
     });

    for (var zPos = -1000; zPos < 1000; zPos+=20) {
      particle = new THREE.Mesh(geometry, material);

      particle.position.x = Math.random() * 2000 - 1000;
      particle.position.y = Math.random() * 700 - 150;
      particle.position.z = zPos;
      this.scene.add(particle);
      this.particles.push(particle);
    }

    this.zInc = 5;
  },

  createLights: function() {
    var light;
    var xPos = -950;
    for (var i=0; i<16; i++) {
      light = new THREE.PointLight(this.colors[i*2], 1, 650);
      light.position.x = xPos;
      light.position.y = -390;

      light.position.z = 150;
      this.scene.add(light);
      this.lights.push(light);

      xPos += 130;
    }
  },

  createBars: function() {
    var bar, material;
    var geometry = new THREE.BoxGeometry(50, 50, 50);

    var xPos = -925;
    for (var i=0; i<32; i++) {
      material = new THREE.MeshStandardMaterial({color: this.colors[i]});
      bar = new THREE.Mesh(geometry, material);

      bar.position.x = xPos;
      bar.position.y = -400;

      xPos += 60;
      this.scene.add(bar);
      this.bars.push(bar);
    }
  },

  updateObjects: function() {
    window.requestAnimationFrame(this.updateObjects);

    this.updateParticles();
    this.updateLights();
    this.updateBars();
    this.camera.aspect = window.innerWidth/window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.mouseX && this.mouseY) {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    }

    if (this.camera.position.y < 0) {
      this.camera.position.y = 0;
    }
  },

  updateParticles: function() {
    if (this.volume > 6000)
      this.zInc += 1;
    else {
      this.zInc -= 1;
    }

    if (this.zInc > 45) {
      this.zInc = 45;
    }

    if (this.zInc < 5) {
      this.zInc = 5;
    }

    for (var i=0; i<this.particles.length; i++) {

      this.particles[i].position.z += this.zInc;

      if (this.particles[i].position.z > 1000) {
        this.particles[i].position.x = Math.random() * 2000 - 1000;
        this.particles[i].position.y = Math.random() * 700 - 150;
        this.particles[i].position.z -= 2500;
      }

    }
    this.renderer.render(this.scene, this.camera);
  },

  updateLights: function() {
    if (this.dataArray) {
      for (var i=0; i<this.lights.length; i++) {

        var dataVal = this.dataArray[(i*2)+12];
        var yScale = (dataVal / 255) * 50 + 1;
        var lightInt = (dataVal / 255) * 1 + 0.2;

        this.lights[i].position.y = yScale + 100;
        this.lights[i].intensity = lightInt;
      }
    }
  },

  updateBars: function() {
    if (this.dataArray) {
      for (var i=0; i<this.bars.length; i++) {
        var dataVal = this.dataArray[i+12];
        var yScale = (dataVal / 255) * 40 + 1;
        this.bars[i].scale.set(1, yScale, 1);
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
    analyser.fftSize = 128;
    //half the fft size, number of bins
    var bufferLength = analyser.frequencyBinCount;

    //hook <audio> element up with ctx
    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    setInterval(function() {
      analyser.getByteFrequencyData(this.dataArray);
      var total = 0;
      for(var i=0; i<40; i++) {
        total += this.dataArray[i];
      }
      this.volume = total;
    }.bind(this), 20);

    this.volume = 0;
    this.dataArray = new window.Uint8Array(bufferLength);
  },

  render: function() {
    return <div/>;
  }

});

module.exports = Visualizer;
