class VideoPlayer {
    public video: VideoOptions;
    private player: MultiVideoPlayer;
    private videoId: string;
    constructor(player: MultiVideoPlayer, video: VideoOptions, options?: VideoPlayerOptions) {
        this.player = player;
        this.video = video;
        this.videoId = options?.videoId || '';
        this.mount();
    }

    private mount() {
        this.render();
    }

    private render() {
        const html = `
      <div class="video_player">
        <video src="${this.video}" controls></video>
      </div>
    `;
    }
}

export default VideoPlayer;
