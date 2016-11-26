var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'src/main/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build/assets'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
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
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
