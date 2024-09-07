import {Routes, Route} from "react-router-dom"
import { Login } from "./pages/login/Login.jsx"
import { Register } from "./pages/register/Register.jsx"
import { Home } from "./pages/home/Home.jsx"
import ProtectedRoute from "./routesProtected.jsx"

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/cadastro" element={<Register/>}/>
            <Route path="/home" element=
                {
                    <ProtectedRoute element={<Home/>}/> 
                }
            />
        </Routes>
    )
}