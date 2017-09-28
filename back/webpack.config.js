const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const pack = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `${pack.name}.js`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: "babel-loader",
                options: {
                    presets: ['stage-0'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
    ]
};