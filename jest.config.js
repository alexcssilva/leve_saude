module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
