import path from 'path';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const amdRule = {
  parser: {
    amd: false // https://github.com/lodash/lodash/issues/3052
  }
};

const jisonRule = {
  test: /\.jison$/,
  use: {
    loader: path.resolve(__dirname, './jisonLoader'),
    options: {
      'token-stack': true
    }
  }
};
const jsRule = {
  test: /\.js$/,
  include: [
    path.resolve(__dirname, './src'),
    path.resolve(__dirname, './node_modules/dagre-d3-renderer/lib')
  ],
  use: {
    loader: 'babel-loader'
  }
};

const scssRule = {
  // load scss to string
  test: /\.scss$/,
  use: [{ loader: 'css-to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
};

export const jsConfig = () => {
  return {
    mode: 'development',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    target: 'web',
    entry: {
      mermaid: './src/mermaid.js'
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jison']
    },
    node: {
      fs: 'empty' // jison generated code requires 'fs'
    },
    output: {
      path: path.join(__dirname, './dist/'),
      filename: '[name].js',
      library: 'mermaid',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'typeof self !== "undefined" ? self : this'
    },
    module: {
      rules: [amdRule, jsRule, scssRule, jisonRule]
    },
    // plugins: [new BundleAnalyzerPlugin()],
    devtool: false
  };
};
