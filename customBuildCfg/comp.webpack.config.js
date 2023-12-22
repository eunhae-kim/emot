const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  entry: {
    bottomNav: './src/components/standaloneEntry/bottomNavComp.tsx',
  },
  output: {
    path: `${__dirname}/../public`,
    filename: '[name].js',
  },
  target: ['web', 'es5'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'customBuildCfg/tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            /*
            options: {
              prependData: '$dir2:test;',
            },
            */
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // omit creation of LICENSE.txt files
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  // process.env가 아예 없을 경우, 외부 사용을 위해 별도 빌드된 소스를 로드하면 바로 참조 오류가 발생해서 네임스페이스만 더미로 추가 해 줌
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          _dummy: '""'
        }
      }
    }),
  ]
};
module.exports = config;
