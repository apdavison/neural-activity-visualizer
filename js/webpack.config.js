'use strict';

module.exports = {
    mode: 'development',
    entry: './src/visualizer.js',
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                }
              ]
            },
            {
              test: /\.html$/,
              use: [
                  { loader: "html-loader" }
              ]
            }
        ]
    }
};
