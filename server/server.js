const fs = require('fs')
const cors = require('cors')
const express = require('express') 
const { Router } =require('express') 

const yt = require("yt-converter")
const { getInfo } = require('ytdl-getinfo')

const app = express()
const route = Router()
const PORT = 3000
let name = ''

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(route)

route.get('/test',(req,res)=>{
    return res.json({
        message:'Server Running...'
    })
})

route.post('/',(req,res)=>{

    const url = req.body.url
    let title = ''

    getInfo(url).then(info => {
        console.log(info.items[0].title)
        name = info.items[0].title
    })
    
    yt.convertAudio({
        url,
        itag: 140,
        directoryDownload: './downloads',
        title
    })

})

route.get('/download',(req,res)=>{

    res.download(__dirname + `/downloads/${name}`)

})

app.listen(PORT,()=>{
    console.log('SERVER RUNNING ON PORT',PORT)
})