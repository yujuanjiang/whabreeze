var Audio = React.createClass({ displayName: "Audio",
  _toggleAudioState() {
    var audioPlayer = _.assign({}, this.state.audioPlayer),
    audioEl = this.refs.audio;

    if (audioPlayer.loaded == undefined) {
      audioPlayer = { loaded: false, state: 'pause', duration: 0 };
      audioEl.load();
    }

    if (audioPlayer.state == 'pause') {
      audioPlayer.state = 'play';
      audioEl.play();
    } else {
      audioPlayer.state = 'pause';
      audioEl.pause();
    }

    this.setState({ audioPlayer: _.assign({}, this.state.audioPlayer, audioPlayer) });
  },
  _audioReady() {
    var audioPlayer = _.assign({}, this.state.audioPlayer);

    audioPlayer.loaded = true;
    this.setState({ audioPlayer: _.assign({}, this.state.audioPlayer, audioPlayer) });
    this.audio.loop = true;
  },
  _audioTimeUpdate() {
    var audioPlayer = _.assign({}, this.state.audioPlayer),
    audioEl = this.refs.audio,
    duration = Math.floor(audioEl.duration);

    this.refs.range.value = Math.floor(audioEl.currentTime);

    if (duration != audioPlayer.duration) {
      audioPlayer.duration = duration;

      this.setState({ audioPlayer: _.assign({}, this.state.audioPlayer, audioPlayer) });
    }
  },
  _rangeInput() {
    this.refs.audio.pause();
  },
  _rangeChange() {
    var audioEl = this.refs.audio;

    audioEl.currentTime = this.refs.range.value;

    if (this.state.audioPlayer.state == 'play')
    audioEl.play();
  },
  getInitialState() {
    return {
      audioPlayer: {} };

  },
  render() {
    var ap = this.state.audioPlayer;

    return /*#__PURE__*/React.createElement("div", { className: "audio-player" }, /*#__PURE__*/
    React.createElement("audio", { ref: "audio", onCanPlayThrough: () => this._audioReady(), onTimeUpdate: () => this._audioTimeUpdate(), preload: "none", src: "static/guide.mp3", loop: "True" }), /*#__PURE__*/
    React.createElement("button", { title: "Listen to this file", onClick: () => this._toggleAudioState(), disabled: ap.loaded === false ? true : false }, /*#__PURE__*/
    React.createElement("i", { className: `-${ap.state || 'pause'}` })), /*#__PURE__*/

    React.createElement("input", { ref: "range", onInput: e => this._rangeInput(), onChange: e => this._rangeChange(e), type: "range", min: "0", max: ap.duration, step: "1", disabled: ap.loaded === true ? false : true }));

  },
  componentDidMount() {
    this.refs.range.value = 0;
  } });


React.render( /*#__PURE__*/React.createElement(Audio, null), document.getElementById('app'));
