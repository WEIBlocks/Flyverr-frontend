import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Treat unused variables as warnings instead of errors
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Treat unescaped entities as warnings instead of errors
      "react/no-unescaped-entities": "warn",
      
 
      
      // Treat HTML anchor elements as warnings instead of errors
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
];

export default eslintConfig;
