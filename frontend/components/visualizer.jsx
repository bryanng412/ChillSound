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
    this.createParticles();
    this.updateParticles();

    return { songUrl: VisualizerStore.songUrl() };
  },

  createParticles: function() {
    var particle;
    var geometry = new THREE.SphereGeometry(4,8,8);
    var material = new THREE.MeshBasicMaterial();

    for (var zPos = -2000; zPos < 1000; zPos+=10) {
      particle = new THREE.Mesh(geometry, material);
      particle.position.x = Math.random() * 4000 - 2000;
      particle.position.y = Math.random() * 2500 - 1250;
      particle.position.z = zPos;
      this.scene.add(particle);
      this.particles.push(particle);
    }
  },

  updateParticles: function() {
    var zInc = this.volume > 10000 ? this.volume * 0.001 : 1;

    this.requestId = window.requestAnimationFrame(this.updateParticles);

    this.camera.aspect = window.innerWidth/window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    for (var i=0; i<this.particles.length; i++) {

      this.particles[i].position.z += zInc;

      if (this.particles[i].position.z > 1000) {
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
    }.bind(this), 20);
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
