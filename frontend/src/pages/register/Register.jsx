import { useEffect, useState } from "react";
import { Input } from "../../components/Input.jsx"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner'

export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [userCreated, setUserCreated] = useState(false)
    const [timeLeft, setTimeLeft] = useState(5);
    const [notice, setNotice] = useState('');
    const [viewNotice, setViewNotice] = useState(false);

    const userCreatedSucess = () => {
        setUserCreated(!userCreated)
    }
    const handleRegister = () => {
        return navigate("/")
    }

    const handleChangeEmail = (e) => {
        setFalseNotices();
        setEmail(e.target.value)
    }

    const handleChangeFullname = (e) => {
        setFalseNotices();
        setFullname(e.target.value)
    }

    const handleChangePassword = (e) => {
        setFalseNotices();
        setPassword(e.target.value)
    }

    const handleChangePasswordAgain = (e) => {
        setFalseNotices();
        setPasswordAgain(e.target.value)
    }

    function verifyIfTheSamePassword(password, passwordAgain) {
        return password === passwordAgain;
    }
    
    const setFalseNotices = () => {
        setViewNotice(false);
        setUserCreated(false);
    }

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

    const fetchRegister = async (e) => {
        e.preventDefault();
        if(verifyIfTheSamePassword(password, passwordAgain)) {
            try {
                const response = await fetch(`http://localhost:3030/user/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, fullName }),
                });
        
                if (response.ok) {
                    userCreatedSucess(true)
                    const interval = setInterval(() => {
                        setTimeLeft((prevTime) => {
                            if (prevTime === 1) {
                                clearInterval(interval); 
                                navigate(`/`); 
                            }
                            return prevTime - 1;
                        });
                    }, 1000);
                } else {
                    setViewNotice(!viewNotice);
                    switch(response.status) {
                        case 400:
                            setNotice("Preencha todos os campos.")
                            break;
                        case 409:
                            setNotice("Já existe usuário com esse email.")
                            break;
                        default:
                            setNotice("Tente novamente mais tarde.")
                            break;
                    }
                }
            } catch (error) {
                toast.error('Erro ao conectar com servidor')
            }
        } else {
            toast.info('Senhas diferentes')
        }
    };
    
    return (
        <>
        <Toaster richColors/>
        <div className='fixed top-0 bg-gradient-to-t from-gray-900 to-gray-950 w-lvw h-lvh justify-center items-center flex flex-col  text-white '>
            <main className='flex gap-36'>
                <section className='flex flex-col'>
                <h2 className='font-black text-9xl text-lime-500'>AnotAi</h2>
                <p className='text-xl text-lime-500'>O controle do dia em suas mãos.</p>
                </section>
                <section className='flex flex-col gap-8'>
                <main className='flex flex-col w-96 gap-4 '>
                    <form className='flex flex-col w-96 gap-4 ' onSubmit={fetchRegister}>
                        <Input 
                            type="email"
                            placeholder="Email"
                            onChange={(e) => handleChangeEmail(e)}
                            value={email}
                            required={true}
                        />
                        <Input 
                            type="text"
                            placeholder="Nome completo"
                            onChange={(e) => handleChangeFullname(e)}
                            value={fullName}
                            required={true}
                        />
                        <Input 
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => handleChangePassword(e)}
                            value={password}
                            required={true}
                        />
                        <Input 
                            type="password"
                            placeholder="Repita a senha"
                            onChange={(e) => handleChangePasswordAgain(e)}
                            value={passwordAgain}
                            required={true}
                        />
                        <button 
                            type="submit" 
                            className='bg-white rounded-md text-blue-950 hover:text-lime-700'> 
                            Registrar 
                        </button>
                        {
                            userCreated ? (
                                <div className="flex flex-col justify-center items-center text-green-400">
                                    <span >
                                        Usuário criado com sucesso
                                    </span>
                                    <span>
                                        Redirecionando para página login em {timeLeft}s
                                    </span>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        {
                            viewNotice ? (
                                <span className="flex flex-col justify-center items-center text-red-500">
                                    {notice}
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
                <button type="button" className='group'>Já tem uma conta? <strong   className='group-hover:underline text-lime-500' onClick={handleRegister}>Entre aqui</strong> </button>
            </footer>
        </div>
        </>
    )
}