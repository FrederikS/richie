var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        // Webpack Development Server mit Hot Reloading
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'src/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build/assets'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: 'build',
        port: 3001
    },
    module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            { test: /\.css$/, exclude: /\.global\.css$/, loader: 'style-loader!css-loader?modules&camelCase' },
            { test: /\.global\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
