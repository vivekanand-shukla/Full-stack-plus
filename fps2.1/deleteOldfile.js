// PS C:\vivek\code\neog-latest\full stack plus\fps2.1> ni ./files/sample3.txt; (gi ./files/sample3.txt).LastWriteTime="2024-08-18 12:30"
// ni ./files/sample35.txt -ItemType File -Force; (gi ./files/sample35.txt).LastWriteTime = (Get-Date "2025-08-18 12:30")
require("dotenv").config()


const fs = require("fs")
const path = require("path")
const dirpath = path.resolve(process.env.DIRECORY_PATH)
const thresholddays = parseInt(process.env.THRESHHOLD_DAYS)
const threshholdDate  = new Date(Date.now() - (thresholddays *24 * 60 * 60  * 1000) )
fs.readdir(dirpath ,(err, files)=>{
    if(err){
        console.error("Error Decting Directory : ", err)

    }
    files.forEach(file => {
        const fiePAth = path.join(dirpath ,file)
        fs.stat(fiePAth, (err, stat)=>{
            if(err){

                return console.error("Error getting file stack" , err)
            }
          if(stat.mtime < threshholdDate){
            fs.unlink(fiePAth , (err)=>{
                if(err){
                    console.log("Error in Deleting file" ,err)
                }else{
                    console.log("Deleted old file successfully" , fiePAth)
                }
            })

          }
        })
    }) 
})