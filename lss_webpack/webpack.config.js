const path = require('path')
const htmlWebapackPlugin = require('html-webpack-plugin') //html 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //删除打包后的文件
// module.exports = {
//     entry: './src/index.js', //入口
//     output: {
//         path:path.resolve(__dirname,'dist') ,
//         filename:'main.js'
//     }
// }



//如果想打包两个文件  //就要入口使用对象的形式
// 出口要使用占位符 打包
module.exports = {
    mode: "development",//开发模式  production 生产模式
    //入口
    entry: {
        main: './src/index.js',
    },
    //出口
    output: {
        // publicPath:'http://cdn.com', //如果要给打包的资源 加上地址 别名  ==> 打包出来的js  就带上了http://cdn.com/index.js
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [  //rules 规则  (读: /ruːlz/) 
            // {
            //     test: /.jpg$/, //匹配到jpg 就使用file-loader 进行处理
            //     use: 'file-loader' //use 就是使用那个loader
            // }
            {
                test: /.(jpg|png|gif)$/, //匹配jpg|png|gif 图片 
                use: {
                    loader: 'url-loader',
                    options: { //配置项
                        //占位符 name+hash.jpg
                        name: '[name]_[hash].[ext]', //这个意思说 如果名字说原来的名字 后缀也是原来的后缀
                        outputPath: 'imges/', //输入路径
                        limit: 2048 // limit ==> 如果图片大于 2048 kb 就会被打包成静态的资源 如果没有 webpack就会打包成base64
                    }
                }
            }
        ]
    },
    //plugins 是插件集合 
    // 他类似声明周期 在不同的时间 做不同的事情
    plugins: [
        new htmlWebapackPlugin({
            template: './src/index.html' //模板入口
        }),
        new CleanWebpackPlugin() //重新删除 在创建的插件 
    ]
}


/**
 * 笔记：
 * 1.plugins 就是处理各种模板等
 * 1-1 例如 htmlWebapackPlugin 就是帮助webpack 更强模板的功能
 *
 * 2.models 里面添加loader 就是帮助webpack认识各种文件  ==> loader 就是帮助处理各种模块
 * 2-1 url-loader 用户处理图片的loader
 */