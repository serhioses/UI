var webpack = require('webpack');
var path = 'app/js/dev';

module.exports = {
    cache: true,
    debug: true,
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!./app/js/libs/simpla/simpla.js',
        'script!./app/js/libs/simpla/simpla-ui.js',
        path + '/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
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
            Main: path + '/components/Main.jsx',
            Nav: path + '/components/Nav.jsx',
            Form: path + '/components/Form.jsx',
            Dropdown: path + '/components/Dropdown.jsx',
            Tabs: path + '/components/Tabs.jsx',
            Footer: path + '/components/Footer.jsx'
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