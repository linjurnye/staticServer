//开启http path路径 fs读取文件
let http = require("http");
let fs = require("fs");
let path = require("path");
//引入第三方mime
let mime = require("mime")
//配置网站根目录的绝对路径
let rootPath = path.join(__dirname,"www");
// 开启http服务
http.createServer((request,response)=>{
    //获取用户需要获取的文件路径
    let reqUrl = request.url;
    //请求路径
    let pathFile = path.join(rootPath,reqUrl);
    //判断文件是否存在
    if(fs.existsSync(pathFile)){
        // 存在判断是否存在文件夹
        if(pathFile[pathFile.length-1]== "\\"){
            console.log("文件夹")
        }else{
            //读取文件 返回读取的文件
            fs.readFile(pathFile,(err,data)=>{
                //返回文件类型
                response.writeHead(200,{
                    "content-type":mime.getType(pathFile)
                })
                if(err){

                }else{
                    response.end(data)
                }
            })
        }
    }else{
        //不存在返回404
        response.writeHead(404,{
            "content-type":"text/html;charset=utf-8"
        })
        response.end(`<h2>404错误</h2>`)
    }
}).listen(88,"127.0.0.1",()=>{
    console.log('开始监听')
});