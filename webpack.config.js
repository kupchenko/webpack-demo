const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Copies html files into output folder and inserts JS files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Cleans files from previous build

module.exports = {
    context: path.resolve(__dirname, 'src'), //To avoid using {... entry: './src/index.js' ...}
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].[hash].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.css'] //Helps to remove extensions when importing
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html' //If no template specified, empty index.html is created
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ // Webpack process the last loader first (e.g. styles-loader). Starts from end
                    'style-loader', // Adds styles into <style> in header
                    'css-loader' // Responsible for compiling "import './blabla.styles' " syntax
                ]
            }
        ]
    }
};