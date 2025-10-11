// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "Eat Like The Rainbow",
    slug: "ELTRFront",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./app/assets/eltrLogo-IOS.png",
    splash: {
      image: "./app/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.eatliketherainbow.eatliketherainbow",
      buildNumber: "1.0.0",
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          "This app uses the camera to scan barcodes of grocery items to pull their ingredients list.",
      },
    },
    android: {
      package: "com.eatliketherainbow.eatliketherainbow",
      versionCode: 1,
    },
    web: {
      favicon: "./app/assets/eltrLogo.png",
    },
    extra: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      DATABASE_URL: process.env.DATABASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      MESSAGE_SENDER_ID: process.env.MESSAGE_SENDER_ID,
      APP_ID: process.env.APP_ID,
    },
  },
};
