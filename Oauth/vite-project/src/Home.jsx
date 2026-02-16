function Home() {

  const login = (provider) => {
    window.location.href = `http://localhost:4000/auth/${provider}`
  }

  return (
    <div style={styles.container}>
      <h1>OAuth Login</h1>

      <button
        style={styles.githubBtn}
        onClick={() => login("github")}
      >
        Login with GitHub
      </button>

      <button
        style={styles.googleBtn}
        onClick={() => login("google")}
      >
        Login with Google
      </button>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    background: "#111",
    color: "white"
  },
  githubBtn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  googleBtn: {
    padding: "10px 20px",
    background: "white",
    color: "black",
    border: "none",
    cursor: "pointer"
  }
}

export default Home
