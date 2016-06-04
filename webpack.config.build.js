var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/MuiWrappers.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Richie.js',
        libraryTarget: 'var',
        library: 'Richie'
    },
    externals: {
        'immutable': 'Immutable',
        'react': 'React',
        'react-dom': 'ReactDOM'
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
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
