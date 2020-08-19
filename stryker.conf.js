/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  coverageAnalysis: "off",
  mutate: ["src/**/*.ts", "!src/**/__tests__/*", "!src/index.ts"],
  mutator: "typescript",
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  transpilers: [],
  thresholds: { high: 90, low: 80, break: 70},
  tsconfigFile: "tsconfig.json",
};
