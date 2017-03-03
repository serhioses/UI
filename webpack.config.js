var webpack = require('webpack');
var jsFolder = 'app/js/dev';

module.exports = {
    cache: true,
    debug: true,
    entry: jsFolder + '/app.jsx',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: __dirname,
        alias: {
            Main: jsFolder + '/components/Main.jsx',
            Nav: jsFolder + '/components/Nav.jsx',
            Home: jsFolder + '/components/Home.jsx',
            About: jsFolder + '/components/About.jsx',
            Form: jsFolder + '/components/Form.jsx',
            UI: jsFolder + '/components/UI.jsx',
            Dropdown: jsFolder + '/components/Dropdown.jsx',
            Tabs: jsFolder + '/components/Tabs.jsx',
            Spinner: jsFolder + '/components/Spinner.jsx',
            Bundle: jsFolder + '/components/Bundle.jsx',
            Search: jsFolder + '/components/Search.jsx',
            regions: jsFolder + '/api/get-regions.jsx',
            Footer: jsFolder + '/components/Footer.jsx'
        }
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules)/
            }
        ]
    },
    devtool: 'cheap-module-inline-source-map'
};