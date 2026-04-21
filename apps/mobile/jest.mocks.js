// Mocks for Expo native modules that require a native bridge
// These are replaced with simple implementations for unit testing

module.exports = {
  // expo-secure-store
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  getItemAsync: jest.fn().mockResolvedValue(null),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),

  // expo-sqlite
  openDatabaseAsync: jest.fn().mockResolvedValue({
    execAsync: jest.fn().mockResolvedValue(undefined),
    runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest.fn().mockResolvedValue(null),
    closeAsync: jest.fn().mockResolvedValue(undefined),
  }),

  // expo-file-system
  documentDirectory: "/mock/documents/",
  makeDirectoryAsync: jest.fn().mockResolvedValue(undefined),
  getInfoAsync: jest.fn().mockResolvedValue({ exists: false }),
  readAsStringAsync: jest.fn().mockResolvedValue(""),
  writeAsStringAsync: jest.fn().mockResolvedValue(undefined),
  deleteAsync: jest.fn().mockResolvedValue(undefined),
  uploadAsync: jest.fn().mockResolvedValue({ status: 200, body: "" }),

  // expo-constants
  default: { expoConfig: {} },
  Constants: { expoConfig: {} },

  // expo-crypto
  digestStringAsync: jest.fn().mockResolvedValue("mock-hash"),
  CryptoDigestAlgorithm: { SHA256: "SHA256" },
};
