const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
         main:path.resolve(__dirname,'./src/index.js')
    },
  
    output: {
      path:path.resolve(__dirname,'./dist'),
      filename: "example.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: "My App",
          template: path.resolve(__dirname, "./src/index.html"),
          filename: "index.html",
          inject: "body",
        }),
        new CleanWebpackPlugin(),
        
    ],
    module: {
        rules: [
              {   
                test: /\.txt$/, 
                use: 'raw-loader' 
              },
          
              {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: ["babel-loader"],
              },
              {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                type: "asset/resource",
              },
              {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
              },
          {
            test: /\.scss$/,
            use: [
                "style-loader", // 3. Inject styles into DOM
                "css-loader", // 2. Turns css into commonjs
                "sass-loader", // 1. Turns sass into css
            ],
          },
        ],
      },
      mode: "development",
      devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 1950,
      },
}