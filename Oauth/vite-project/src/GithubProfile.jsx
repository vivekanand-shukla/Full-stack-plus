import { useEffect, useState } from "react"
import axios from "axios"

function GithubProfile() {

  const [user, setUser] = useState(null)
  if(user){

      console.log(user)
  }
  useEffect(() => {
    axios.get("http://localhost:4000/user/profile/github", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data.user)
    })
    .catch(err => {
      console.log(err)
      window.location.href = "/"
    })
  }, [])

  if (!user) {
    return <h2 style={{color:"white", textAlign:"center"}}>Loading...</h2>
  }

  return (
    <div style={{textAlign:"center", color:"white", background:"#111", height:"100vh"}}>
      <img
        src={user.avatar_url}
        alt="avatar"
        width="120"
        style={{borderRadius:"50%", marginTop:"50px"}}
      />
      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </div>
  )
}

export default GithubProfile
