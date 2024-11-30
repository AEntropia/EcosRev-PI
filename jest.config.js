module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.{d.ts}",
    "!src/**/layout.tsx",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/_mocks/styleMock.ts", // Mock para arquivos de estilo
    "^next/router$": "<rootDir>/_mocks/next/router.ts", //Mock do router
    "^next/navigation$": "<rootDir>/_mocks/next/navigation.ts", //Mock do app router
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
    "^.+\\.(svg|jpg|jpeg|png|gif|webp|avif|ico|bmp|tiff)$":
      "jest-transform-stub", // Adicionando jest-transform-stub para arquivos de mídia
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  testEnvironment: "jest-fixed-jsdom",
};
