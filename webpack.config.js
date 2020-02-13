const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Copies html files into output folder and inserts JS files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Cleans files from previous build

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].[hash].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' //If no template specified, empty index.html is created
        }),
        new CleanWebpackPlugin()
    ]
};