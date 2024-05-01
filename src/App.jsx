import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to={"login"}/>} />
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
