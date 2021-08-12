/**
 * custom postcss configuration, you can modify the behavior of post css
 * in this file.
 * @info learn more: https://postcss.org/
 */
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
