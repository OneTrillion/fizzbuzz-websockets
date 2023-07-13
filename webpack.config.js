/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = {
  mode: process.env.NODE_ENV || "production",
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "src/client/tsconfig.json"),
            },
          },
        ],
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.(png|jp(e*)g|woff2?)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      t: path.resolve(__dirname, "src/shared/"),
    },
  },
};

const clientConfig = {
  ...common,

  name: "client",
  target: "web",

  entry: {
    index: "./src/client/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist_client"),
    filename: "[name].bundle.js",
  },

  devServer: {
    port: 3000,
    open: true,
    https: false,
    historyApiFallback: {
      index: "/",
    },
    hot: true,
    client: {
      overlay: {
        warnings: false,
      },
    },
    proxy: [
      {
        context: ["/chat"],
        target: "ws://localhost:3001",
        ws: true,
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin()],
};

module.exports = clientConfig;
