const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    Game: path.resolve(__dirname, 'Game.src.js')
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    'nymph-client': 'nymph-client'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/transform-classes',
                {
                  builtins: ['Error']
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
