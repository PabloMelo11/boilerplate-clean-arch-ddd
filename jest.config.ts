import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/domain/entities/**/*.ts',
        '!<rootDir>/src/domain/entities/errors/**/*.ts',
        '<rootDir>/src/application/**/*.ts',
        '!<rootDir>/src/application/queries/**/*.ts',
        '<rootDir>/src/infra/lambdas/implementations/aws/**/*.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text-summary', 'lcov'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src',
    }),
    preset: 'ts-jest',
    // setupFiles: ['<rootDir>/src/shared/tests/setup.ts'],
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
};
