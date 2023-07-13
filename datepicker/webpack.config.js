const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: {
    main: path.resolve("./src/calendar.js"),
  },
  output: {
    filename: "[name].js", // entry에 적은 'main'이라는 key값이 name으로
    path: path.resolve("./dist/"),
  },
  module: {
    rules: [
      // 여기서 로더를 추가할 수 있습니다.
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
