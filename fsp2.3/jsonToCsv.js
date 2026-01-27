const fs = require("fs")
const path = require("path")
const {Parser }= require("json2csv")

//path to json file
const  jsonFilepath = path.join(__dirname, "data.json")
//read  the json file 
try {
    const jsonData = fs.readFileSync(jsonFilepath , "utf-8")
    const data = JSON.parse(jsonData)
    // console.log(jsonData)
    // console.log(data)

  // new csv parser 
  const jsonToCsvParser  = new Parser()
  const csv = jsonToCsvParser.parse(data)

  // write the csv data to file 
  const csvfilePath = path.join(__dirname, "convrtedDataToCsv.csv")
  fs.writeFileSync(csvfilePath ,csv )
  console.log("conversoion successful")
} catch (error) {
    console.error("Error reading or converting to csv ", error)

}