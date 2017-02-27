var webpack = require('webpack');
var jsFolder = 'app/js/dev';

module.exports = {
    cache: true,
    debug: true,
    entry: [
        'script!jquery/dist/jquery.min.js',
        // 'script!./app/js/libs/simpla/simpla.js',
        // 'script!./app/js/libs/simpla/simpla-ui.js',
        jsFolder + '/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // simpla: 'app/js/libs/simpla/simpla.js'
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
            simplaUI: 'app/js/libs/simpla/simpla-ui.js',
            simpla: 'app/js/libs/simpla/simpla.js',
            Main: jsFolder + '/components/Main.jsx',
            Nav: jsFolder + '/components/Nav.jsx',
            Home: jsFolder + '/components/Home.jsx',
            Form: jsFolder + '/components/Form.jsx',
            UI: jsFolder + '/components/UI.jsx',
            Dropdown: jsFolder + '/components/Dropdown.jsx',
            Tabs: jsFolder + '/components/Tabs.jsx',
            Spinner: jsFolder + '/components/Spinner.jsx',
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
    devtool: 'cheap-module-eval-source-map'
};