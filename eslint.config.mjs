import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Plain CJS build tool configs — require() is the correct syntax here.
  { files: ["*.config.js"], rules: { "@typescript-eslint/no-require-imports": "off" } },
];

export default eslintConfig;
