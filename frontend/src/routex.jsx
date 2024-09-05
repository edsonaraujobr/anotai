import {Routes, Route} from "react-router-dom"
import { Login } from "./pages/login/Login.jsx"
import { Register } from "./pages/register/Register.jsx"

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/cadastro" element={<Register/>}/>
        </Routes>
    )
}