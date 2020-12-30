const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {
  minify: false
}) => {
  return {
    entry: "./src/index.js",
    output: {
      libraryTarget: "umd",
      filename: env.minify ? "singlish.min.js" : "singlish.js"
    },
    module: {
      rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
      ]
    },
    optimization: {
      minimize: env.minify && env.minify === 'true',
      minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            // true for `ascii_only`
            ascii_only: true
          },
        },
      })],
    }
  }
};