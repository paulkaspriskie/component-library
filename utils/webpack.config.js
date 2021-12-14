const path = require('path');

module.exports = {
  stats: 'minimal',
  entry: path.resolve(__dirname, '../src/js/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {"runtime": "automatic"}]
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'bundle.js',
    clean: true,
    hotUpdateChunkFilename: '../tmp/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: '../tmp/[fullhash].hot-update.json'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: true
    }
  }
};
