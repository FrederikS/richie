var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config');

baseConfig.entry = [
    'babel-polyfill',
    // Webpack Development Server mit Hot Reloading
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'src/main/app.js')
];

baseConfig.devtool = 'inline-source-map';

baseConfig.devServer = {
    contentBase: 'build',
    port: 3001
};

baseConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

module.exports = baseConfig;
