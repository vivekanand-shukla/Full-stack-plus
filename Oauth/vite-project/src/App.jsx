import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import GithubProfile from "./GithubProfile"
import GoogleProfile from "./GoogleProfile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v2/profile/github" element={<GithubProfile />} />
        <Route path="/v2/profile/google" element={<GoogleProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
