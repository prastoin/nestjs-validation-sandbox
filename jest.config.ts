import type { Config } from 'jest';
const config: Config = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testRegex: ".e2e-spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper: {
        '^src$': '<rootDir>/src',
    },
    moduleDirectories: [
        "node_modules",
        "src"
    ]

};

export default config;