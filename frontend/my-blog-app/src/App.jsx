import { useEffect, useState } from "react"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  const [page, setPage] = useState("login")

  useEffect(() => {

    localStorage.setItem("page", page)
    console.log(page)
  }, [page])

  switch (page) {
    case "login":
      return <Login setPage={setPage} />
    case "register":
      return <Register setPage={setPage} />
    default:
      return <div>Page not found</div>

  }

}

export default App