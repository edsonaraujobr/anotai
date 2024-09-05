import { Input } from "../../components/Input.jsx"
import { useNavigate } from "react-router-dom"

export function Register() {
    const navigate = useNavigate();

    const handleRegister = () => {
        return navigate("/")
    }

    return (
        <div className='fixed bg-gradient-to-r from-blue-900 to-blue-950 w-lvw h-lvh justify-center items-center flex flex-col  text-white '>
            <main className='flex gap-36'>
                <section className='flex flex-col'>
                <h2 className='font-black text-9xl'>AnotAi</h2>
                <p className='text-xl'>O controle do dia em suas mãos.</p>
                </section>
                <section className='flex flex-col gap-8'>
                <main className='flex flex-col w-96 gap-4 '>
                    <form className='flex flex-col w-96 gap-4 '>
                    <Input 
                        type="email"
                        placeholder="Email"
                    />
                    <Input 
                        type="text"
                        placeholder="Nome completo"
                    />
                    <Input 
                        type="password"
                        placeholder="Senha"
                    />
                    <Input 
                        type="password"
                        placeholder="Repita a senha"
                    />
                    <button type="submit" className='bg-white rounded-md text-blue-950 hover:text-blue-800'> Registrar </button>
                    </form>
                </main>
                </section>
            </main>
            <footer className='flex justify-center text-white absolute bottom-20'>
                <button type="button" className='group'>Já tem uma conta? <strong   className='group-hover:underline' onClick={handleRegister}>Entre aqui</strong> </button>
            </footer>
        </div>
    )
}