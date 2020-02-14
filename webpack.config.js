const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Copies html files into output folder and inserts JS files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Cleans files from previous build
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Copies specified files into output dir
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //To minify CSS in 'prod file'
const TerserPlugin = require('terser-webpack-plugin'); //To minify JS in 'prod file'

const outputFolder = 'out';
const env = process.env.NODE_ENV;
const isDev = () => env === 'dev';
const isProd = () => env === 'prod';
console.log(`Running with env: '${env}'`);

const optimization = () => {
    const config = {
        splitChunks: { // Having more then 1 entry point and all/some using the same library, it make sense to extract this shared library
            chunks: 'all'
        }
    };

    if (isProd()) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
};

module.exports = {
    context: path.resolve(__dirname, 'src'), //To avoid using {... entry: './src/index.js' ...}
    entry: './js/index.js', // The entry point JS
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
    optimization: optimization(),
    devServer: {
        port: 4001,
        hot: isDev(),
        watchContentBase: true, //In some cases, this does not work. For example, when using Network File System (NFS).
        // watchOptions: { // For such case ^^^ use this
        //     poll: true
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', //If no template specified, empty index.html is created
            minify: {
                collapseWhitespace: isProd()
            }
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev(), //Hot Module Replacements
                            reloadAll: true
                        }
                    },
                    'css-loader' // Responsible for compiling "import './blabla.styles' " syntax
                ]
            }
        ]
    }
};