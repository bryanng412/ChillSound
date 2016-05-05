var React = require('react');
var React3 = require('react-three-renderer');
var THREE = require('three');
var VisualizerStore = require('../stores/visualizer_store.js');

var Visualizer = React.createClass({

  componentDidMount: function() {
    this.listenerToken = VisualizerStore.addListener(this._onSongStart);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onSongStart: function() {
    if (document.getElementById("player")) {
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
      var sampleAudioStream = function() {
        //this closure samples the audio data and
        //updates the dataArray and volume in real time
        analyser.getByteFrequencyData(this.dataArray);
        var total = 0;
        //volume of first 80 bins, play around with this
        for (var i = 0; i < 80; i++) {
          total += this.dataArray[i];
        }
        this.volume = total;
      }.bind(this);

      //continously sample audio
      setInterval(sampleAudioStream, 20);

      //use these in animations
      this.dataArray = new window.Uint8Array(bufferLength);
      this.volume = 0;
    } else {
      this.dataArray = undefined;
      this.volume = undefined;
    }
  },

  _onAnimate: function() {
  },

  render: function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    return (
      <div className="visualizer">
      </div>
    );
  }

});

module.exports = Visualizer;
