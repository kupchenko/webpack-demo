const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Copies html files into output folder and inserts JS files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Cleans files from previous build
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Copies specified files into output dir
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.


const outputFolder = 'out';

module.exports = {
    context: path.resolve(__dirname, 'src'), //To avoid using {... entry: './src/index.js' ...}
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, outputFolder),
        filename: '[name].[hash].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.css'], //Helps to remove extensions when importing
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    devServer: {
        port: 4001,
        watchContentBase: true, //In some cases, this does not work. For example, when using Network File System (NFS).
        // watchOptions: { // For such case ^^^ use this
        //     poll: true
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html' //If no template specified, empty index.html is created
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img/favicon.ico'),
                to: path.resolve(__dirname, outputFolder)
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ // Webpack process the last loader first (e.g. styles-loader). Starts from end
                    // 'style-loader', // Adds styles into <style> in header
                    MiniCssExtractPlugin.loader,
                    'css-loader' // Responsible for compiling "import './blabla.styles' " syntax
                ]
            }
        ]
    }
};