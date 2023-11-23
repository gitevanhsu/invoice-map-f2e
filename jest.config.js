const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "." });
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
};
const jestConfigWithOverrides = async (...args) => {
  const fn = createJestConfig(customJestConfig);
  const res = await fn(...args);

  res.transformIgnorePatterns = res.transformIgnorePatterns.map((pattern) => {
    if (pattern === "/node_modules/") {
      return "/node_modules/(?!d3-array|d3-geo|internmap)/";
    }
    return pattern;
  });

  return res;
};

module.exports = jestConfigWithOverrides;
