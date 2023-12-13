var ResponseObject = require("../../lib/response");
const fs = require('fs');
const path = require('path');
const directoryPath = 'D:/project/myBlogProject/server/node_modules'; // 替换为指定目录的路径
class FileController{
    constructor(){
        
    }
    async downloadFile(req, res, next){
        console.log(req.params);
        const filePath = req.params[0];
        const visitPath = `${directoryPath}${filePath}`;
        fs.stat(visitPath, (err, stats) => {//判断路径是文件夹还是文件
            console.log(stats);   
            if (err) {
                return res.status(500).json({ error: 'Failed to access path' });  
            }
            if (stats.isFile()) {// 是文件返回给前端下载
                const [fileName] = /[^\/]*$/.exec(visitPath);
                fs.readFile(visitPath, (err, data) => { 
                    console.log(data);   
                    if (err) {      
                        return res.status(500).json({ error: 'Failed to read file' });    
                    }
                    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`); // 设置下载文件的文件名
                    res.setHeader('Content-Type', 'application/octet-stream'); // 设置下载文件的文件类型
                    res.send(data);
                });
            } else if (stats.isDirectory()) {// 是文件夹返回文件夹内容
                fs.readdir(visitPath, (err, files) => { 
                    console.log(files);   
                    if (err) {      
                        return res.status(500).json({ error: 'Failed to read directory' });    
                    }
                    res.json({ files });  
                });
            } else {
              console.log('路径既不是文件也不是文件夹');
            }
          });
        
        //res.send(new ResponseObject({result:{data:null}}));
    }
}
module.exports = new FileController();