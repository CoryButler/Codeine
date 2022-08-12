const path = require('path');
module.exports = {
  entry: './src/interpreter.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    filename: "Codeine.js",
    library: {
      name: "Codeine",
      type: 'umd',
      export: 'default'
    }
  },
  mode: 'production'
};