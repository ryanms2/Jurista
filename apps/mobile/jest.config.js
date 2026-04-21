const path = require("path");

module.exports = {
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        configFile: path.resolve(__dirname, "babel.config.js"),
        caller: { name: "metro", bundler: "metro", platform: "ios" },
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|zustand))",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg|mp4|bmp)$": "<rootDir>/jest.assetMock.js",
    // Mock all Expo native modules
    "^expo-secure-store$": "<rootDir>/jest.mocks.js",
    "^expo-sqlite$": "<rootDir>/jest.mocks.js",
    "^expo-file-system$": "<rootDir>/jest.mocks.js",
    "^expo-constants$": "<rootDir>/jest.mocks.js",
    "^expo-crypto$": "<rootDir>/jest.mocks.js",
  },
  setupFiles: ["<rootDir>/jest.globals.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.expo/"],
};
