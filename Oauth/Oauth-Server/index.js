const cookieParser = require("cookie-parser")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const {verifyAccessToken} = require("./Middleware/index.js")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 4000;
const {setSecureCookie} = require("./services/index.js")
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

app.get("/" , (req,res)=>{
    res.send(`<h1> Welcome to OAuth Api server </h1>`)

})

app.get("/user/profile/github", verifyAccessToken, async (req,res)=>{
    try {

        const  { access_token } = req.cookies
        const githubUserDatatResponse = await axios.get("https://api.github.com/user" , {
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        })
        
        res.json({user : githubUserDatatResponse.data })
    } catch (error) {
        res.status(500).json({error:"Could not fetch user Github profile"})
        
    }
})

app.get("/auth/github" , (req,res)=>{
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo,security_events`

    res.redirect(githubAuthUrl)

})

app.get('/auth/github/callback' ,async(req,res)=>{
    const{ code }= req.query
          
    if(!code){
        return res.status(400).send("Auterization code is not provided")
    }

    try {
        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token" ,{
            client_id : process.env.GITHUB_CLIENT_ID,
            client_secret : process.env.GITHUB_CLIENT_SECRET,
            code
        },
    {headers:
   { 

    Accept:"application/json" 
   }

    }

)
const accessToken = tokenResponse.data.access_token
res.cookie("access_token",accessToken )
// setSecureCookie(res ,accessToken)
return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/github`)

    } catch (error) {
        res.status(500).json(error)
        
    }
})






app.get("/user/profile/google", verifyAccessToken, async (req,res)=>{
    try {

        const  {access_token }= req.cookies
        const googleUserDatatResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",{
            headers:{
                Authorization:`Bearer ${access_token}`
            }
        })
        
        res.json({user : googleUserDatatResponse.data })
    } catch (error) {
        res.status(500).json({error:"Could not fetch user Google profile"})
        
    }
})

app.get("/auth/google" , (req,res)=>{
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:${process.env.PORT}/auth/google/callback&response_type=code&scope=profile email`

    res.redirect(googleAuthUrl)
})

app.get("/auth/google/callback", async(req,res)=>{
    //   console.log("QUERY:", req.query)
    const {code} = req.query
    
    if(!code){
        return res.status(400).send("Auterization code is not provided")
    }
    let accessToken ;


    try {

        
       const tokenResponse = await axios.post("https://oauth2.googleapis.com/token" ,{
         client_id:process.env.GOOGLE_CLIENT_ID,
         client_secret: process.env.GOOGLE_CLIENT_SECRET,
         code,
         grant_type: 'authorization_code',
         redirect_uri:`http://localhost:${process.env.PORT}/auth/google/callback`
       },{
        headers:{
             "Content-Type": "application/x-www-form-urlencoded",
        }
       }
    
    )


    accessToken = tokenResponse.data.access_token
res.cookie("access_token", accessToken)
// setSecureCookie(res ,accessToken)
    return res.redirect(`${process.env.FRONTEND_URL}/v2/profile/google`)
        
    } catch (error) {

         console.error(error)
         return res.status(500).send("Authentication failed" , error)
    }

})

app.listen(PORT , ()=>{
console.log(`server is running on port http://localhost${PORT}`)
})