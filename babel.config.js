module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: ['module:react-native-dotenv'],
    // new plugin configuration to fix white screen error
    plugins: ['react-native-reanimated/plugin'],
  };
};