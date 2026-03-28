<Video
  ref={videoRef}
  style={styles.video}
  source={require("../assets/videos/introHuman.mp4")}
  resizeMode="contain"
  shouldPlay
  isMuted={false}
  useNativeControls
  onPlaybackStatusUpdate={(status) => {
    if (status.didJustFinish) {
      handleFinish();
    }
  }}
/>