// React Native globals — must run before any RN/Expo setup
global.__DEV__ = true;
global.__RCTProfileIsProfiling = false;
global.performance = global.performance || { now: () => Date.now() };
