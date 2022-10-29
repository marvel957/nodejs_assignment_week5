const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req,res) => {
    let filePath = path.join(__dirname,'public',req.url ==='/' ? 'index.html':req.url === '/home' ? 'index.html': req.url)
    let ContentType = getContentType(filePath) || 'text/html'
    let emtyPagePath = path.join(__dirname,'public','404.html')
    fs.readFile(filePath,'utf8',(err,data)=>{
        if (err){
            if(err.code === 'ENOENT'){
                fs.readFile(emtyPagePath,'utf8',(err,data)=>{
                    res.writeHead(200,{'content-Type':ContentType})
                    res.end(data)
                } )
            }
            else{
                res.writeHead(500);
                res.end('A server error has occured')

            }
        }
        if (!err){
            res.writeHead(200,{'content-Type':ContentType})
            res.end(data)

        }
    })

})
const getContentType = (filePath) =>{
    let extname = path.extname(filePath)
    if ( extname === '.js'){
        return 'text/javascript'
    }
    if ( extname === '.css'){
        return 'text/css'
    }
    if ( extname === '.png'){
        return 'image/png'
    }
    if ( extname === '.jpg'){
        return 'image/jpg'
    }

}
const port = 5000;

server.listen(port, () =>{
    console.log(`server is started on port ${port}`)
})