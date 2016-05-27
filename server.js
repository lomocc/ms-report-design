var webpack          = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config           = require("./webpack.config");
var port = 3001;
var publicPath = "http://localhost:" + port + "/";
config.devtool = "inline-source-map";
config.entry.unshift(
    "webpack-dev-server/client?" + publicPath,
    "webpack/hot/only-dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin());

var webpackDevServer = new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
    publicPath: publicPath,
    magicHtml:true
});

webpackDevServer.listen(port, "localhost", function (err) {
    if (err) throw err;
    console.log("Webpack Dev Server started at %s", publicPath);
});