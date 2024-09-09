import { useEffect, useState } from "react";
import { Input } from "../../components/Input.jsx"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner'

export function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewNotice, setviewNotice] = useState(false);

    const handleRegister = () => {
        navigate("/cadastro")
    }

    const handleChangeEmail = (e) => {
        setFalseNotice()
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setFalseNotice()
        setPassword(e.target.value)
    }

    const setFalseNotice = () => {
        setviewNotice(false)
    }
    const userNotFound = () => {
        setviewNotice(!viewNotice)
    }

    const fetchLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password}),
            });
    
            if (response.ok) {
                const { result } = await response.json();
                const decodedToken = JSON.parse(atob(result.token.split('.')[1]));
                const expirationTime = decodedToken.exp * 1000; 
                localStorage.setItem(`user_authToken`, result.token);
                localStorage.setItem(`user_tokenExpiration`, expirationTime);
                localStorage.setItem(`user_id`, result.id)
                navigate(`/home`) 
            } else {
                switch(response.status) {
                    case 404:
                    case 401:
                        userNotFound();
                        break;
                    default:
                        toast.error('Tente novamente mais tarde.')
                        break;
                }
                
            }
        } catch (error) {
            toast.error('Erro ao conectar com servidor')
        }
    };

    useEffect(() => {
        
        const token = localStorage.getItem(`user_authToken`);
        const tokenExpiration = localStorage.getItem(`user_tokenExpiration`);
        const id = localStorage.getItem(`user_id`);
        
        if (token && tokenExpiration && id) {
          localStorage.removeItem(`user_authToken`);
          localStorage.removeItem(`user_tokenExpiration`);
          localStorage.removeItem(`user_id`);
        }
    })

    return (
        <>
        <Toaster richColors/>
        <div className='fixed top-0 bg-gradient-to-r from-gray-900 to-gray-950 w-lvw h-lvh justify-center items-center flex flex-col  text-white '>
            <main className='flex gap-36'>
                <section className='flex flex-col'>
                <h2 className='font-black text-9xl text-lime-500'>AnotAi</h2>
                <p className='text-xl text-lime-500'>O controle do dia em suas mãos.</p>
                </section>
                <section className='flex flex-col gap-8'>
                <main className='flex flex-col w-96 gap-4 '>
                    <form className='flex flex-col w-96 gap-4 ' onSubmit={(e) => fetchLogin(e)}>
                        <Input 
                            type="email"
                            placeholder="Email"
                            required={true}
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <Input 
                            type="password"
                            placeholder="Senha"
                            required={true}
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <button type="submit" className='bg-white rounded-md text-blue-950 hover:text-lime-700'> Entrar </button>
                        <div className='text-lime-500 underline text-sm flex justify-end'>
                            <span className='cursor-pointer '>Esqueci a senha</span>
                        </div>
                        {
                            viewNotice ? (
                                <span className="flex justify-center text-red-500">
                                    Usuário não encontrado
                                </span>
                            ) : (
                                <></>
                            )
                        }
                    </form>
                </main>
                </section>
            </main>
            <footer className='flex justify-center text-white absolute bottom-20'>
                <button type="button" className='group'>Não tem uma conta? <strong   className='group-hover:underline text-lime-500' onClick={handleRegister}>Cadastre-se aqui</strong> </button>
            </footer>
        </div>
        </>
    )
}