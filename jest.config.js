module.exports = {
  setupFilesAfterEnv: [require.resolve("./jest.setup.ts")],
  snapshotSerializers: ["enzyme-to-json"],
  roots: ["<rootDir>/components", "<rootDir>/lib"],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};
