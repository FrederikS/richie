var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Richie.js',
        libraryTarget: 'umd',
    },
    externals: [
        'immutable',
        'react',
        'react-dom',
        'react-addons-transition-group',
        'react-addons-pure-render-mixin',
        'react-addons-create-fragment',
        'react-addons-update',
        'draft-js'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            { test: /\.css$/, exclude: /\.global\.css$/, loader: 'style-loader!css-loader?modules&camelCase' },
            { test: /\.global\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
