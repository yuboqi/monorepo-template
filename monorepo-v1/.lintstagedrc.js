export default {
  "*.{js,ts,mjs,cjs,jsx,json,tsx,css,less,scss,vue,html,md}": ["cspell --no-must-find-files"],
  "*.{js,ts,vue,jsx,tsx}": ["prettier --write", "eslint"]
};
