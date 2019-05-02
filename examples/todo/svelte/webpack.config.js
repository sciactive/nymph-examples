const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    TodoApp: path.resolve(__dirname, 'src', 'TodoApp.html')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.html', '.css']
  },
  externals: {
    'nymph-client': 'nymph-client'
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: true,
            emitCss: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
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
