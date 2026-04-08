import { useEffect, useState } from "react"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"

const App = () => {
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");
    const savedToken = localStorage.getItem("token");

    if (savedToken) return ("home")

    return savedPage || "login";
  })

  useEffect(() => {
    localStorage.setItem("page", page)
    const token = localStorage.getItem("token")

    if (page === "home" && !token)
      setPage("login")
  }, [page])

  switch (page) {
    case "login":
      return <Login setPage={setPage} />
    case "register":
      return <Register setPage={setPage} />
    case "home":
      return <Home setPage={setPage} />
    default:
      return <div>Page not found</div>

  }

}

export default App