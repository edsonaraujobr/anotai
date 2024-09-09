import { ChevronLeftIcon, ChevronRightIcon, PlusCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import { PhotoMenu } from '../../components/PhotoMenu';
import { Task } from '../../components/Task';
import { useState, useEffect, act } from "react"
import * as Dialog from '@radix-ui/react-dialog'; 
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner'

export function Home () {
    const itens = ["Todas tarefas", "Tarefas pendentes", "Tarefas concluidas"]
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [task, setTask] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState([]);
    const [taskNoCompleted, setTaskNoCompleted] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(itens[0]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        switch(activeTab) {
            case itens[0]:
                fetchData(currentPage);
                break;
            case itens[1]:
                fetchDataNoCompleted(currentPage);
                break;
            case itens[2]:
                fetchDataCompleted(currentPage);
                break;
        }
    }, [currentPage, activeTab, task]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const fetchData = async (page) => {
        try {
            const userId = localStorage.getItem(`user_id`);
            const token = localStorage.getItem('user_authToken');

            const response = await fetch(`http://localhost:3030/task/readAll?page=${page}&limit=3`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify( {userId} )
            });
            if (!response.ok) {
                throw new Error('ERRO!');
            }
            const data = await response.json();
            setTask(data.tasks);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const fetchDataCompleted = async (page) => {
        try {
            const userId = localStorage.getItem(`user_id`);
            const token = localStorage.getItem('user_authToken');

            const response = await fetch(`http://localhost:3030/task/readAllCompleted?page=${page}&limit=3`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify( {userId} )
            });
            if (!response.ok) {
                throw new Error('ERRO!');
            }
            const data = await response.json();
            setTaskCompleted(data.tasks);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const fetchDataNoCompleted = async (page) => {
        try {
            const userId = localStorage.getItem(`user_id`);
            const token = localStorage.getItem('user_authToken');

            const response = await fetch(`http://localhost:3030/task/readAllNoCompleted?page=${page}&limit=3`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify( {userId} )
            });
            if (!response.ok) {
                throw new Error('ERRO!');
            }
            const data = await response.json();
            setTaskNoCompleted(data.tasks);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('user_authToken');
        const tokenExpiration = localStorage.getItem('user_tokenExpiration');
        
        if (token && tokenExpiration) {
            const isExpired = Date.now() > tokenExpiration;
            
            if (isExpired) {
                logout();
            } else {
                const timeout = setTimeout(() => {
                    logout();
                }, tokenExpiration - Date.now());
                
                return () => clearTimeout(timeout);
            }
        } else 
            logout();
    }, []);

    const logout = () => {
        localStorage.removeItem('user_authToken');
        localStorage.removeItem('user_tokenExpiration');
        localStorage.removeItem(`user_id`);
        navigate("/")
    }

    const handleTabChange = (value) => {
        setCurrentPage(1)
        setActiveTab(value);
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const cleanInputs = () => {
        setTitle('')
        setDescription('')
    }

    const fetchCreateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('user_authToken');
            const id = localStorage.getItem(`user_id`);

            const response = await fetch(`http://localhost:3030/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, id}),
            });
    
            if (response.ok) {
                toast.success('Tarefa criada com sucesso')
                cleanInputs();
                fetchData(currentPage);
                setOpen(false);
            } else {
                toast.error('Erro ao criar tarefa')
            }
        } catch (error) {
            toast.error('Erro com o servidor.')
        }
    }

    const handleTaskRemoved = (taskId) => {
        setTask(task.filter(task => task.id !== taskId));
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
        <Toaster richColors className='fixed'/>
            <div className='flex flex-col bg-gray-900 w-lvw h-lvh text-lime-500 fixed top-0'>
                <Tabs.Root
                    value={activeTab}
                    onValueChange={handleTabChange}
                >
                    <header className="flex py-4 px-10 justify-between items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-950 w-full h-14 text-lime-500">
                        <Tabs.List className='flex gap-8' >
                            {itens.map((item) => (
                                <Tabs.Trigger 
                                    key={item} 
                                    value={item}
                                    className={`text-lime-500 text-xs md:text-lg lg:text-lg p-2 duration-100 transition ease-in-out delay-15  ${activeTab === item? 'border-b-2 border-b-lime-400' : 'border-b-transparent'}`}
                                
                                >
                                    {item}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        <PhotoMenu
                            onClickedExit={logout}
                        />
                    </header>
                    <div className='flex-grow flex items-end justify-end px-10 absolute md:right-6 md:top-16 top-16 right-16'>
                        <Dialog.Trigger onClick={() => setOpen(true)}>
                            <button
                                type="button"
                                className='bg-lime-700 duration-100 transition ease-in-out delay-15 hover:bg-lime-600 rounded-md flex justify-center items-center gap-1 p-1 text-sm text-white'
                                onClick={cleanInputs}
                            >
                                <PlusCircledIcon />
                                Adicionar tarefa
                            </button>
                        </Dialog.Trigger>
                    </div>
                    <Dialog.Portal>
                        <Dialog.Overlay className='inset-0 fixed bg-black/70 transition-opacity duration-300 opacity-100'/>
                        <Dialog.Content className='fixed inset-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 sm:max-w-[90vw] sm:max-h-[90vh] md:max-w-[640px] lg:w-[35vw] lg:h-[50vh] bg-gradient-to-b from-gray-800 to-gray-900 rounded-md flex flex-col outline-none transition-transform duration-300 transform-gpu scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100'>
                            <Dialog.Close className='absolute top-0 right-0 bg-gray-800 p-1.5 text-lime-400 hover:text-lime-600'>
                                <Cross1Icon/>
                            </Dialog.Close>
                            <form className='flex flex-col w-full h-full justify-center items-center text-white p-4' onSubmit={fetchCreateTask}>
                                <div className='flex flex-1 flex-col justify-center gap-4 md:gap-1 lg:gap-1 xl:gap-1 w-full max-w-[90vw] sm:max-w-[400px]'>
                                    <input 
                                        type="text"
                                        placeholder='Título'
                                        onChange={handleChangeTitle}
                                        required
                                        value={title}
                                        className='bg-transparent border border-gray-700 px-4 outline-none text-lime-500 placeholder-lime-600 w-full'
                                        maxLength={100}
                                    />
                                    <textarea 
                                        placeholder='Descrição'
                                        onChange={handleChangeDescription}
                                        required
                                        value={description}
                                        className='bg-transparent border border-gray-700 px-4 outline-none h-72 md:h-32 lg:h-32 xl:h-32 text-lime-500 resize-none placeholder-lime-600 w-full'
                                        />
                                </div>
                                <button 
                                    type="submit"
                                    className='bg-lime-700 rounded-md hover:bg-lime-800 px-4 mt-4'
                                >
                                    Criar tarefa
                                </button>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>

                    <Tabs.Content value={itens[0]}>
                        <div className='flex flex-col justify-center items-center h-lvh gap-4 px-10 '>
                                { task && task.length > 0 ? 
                                    (
                                        <>
                                            {task.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                    id={item.id}
                                                    initialStatusCompleted={item.completed}
                                                    onTaskRemoved={handleTaskRemoved}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center absolute bottom-10 text-white'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        <ChevronLeftIcon className={`size-6 ${currentPage !== 1 ? 'hover:text-slate-950 cursor-pointer duration-100 transition ease-in-out delay-15' : ''}`}/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        <ChevronRightIcon className={`size-6 ${totalPages !== 1 && totalPages !== currentPage ? 'hover:text-slate-950 cursor-pointer duration-100 transition ease-in-out delay-15' : ''}`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : 
                                    (
                                        <p> Nenhuma tarefa criada. </p>
                                    )
                                }
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value={itens[1]}>
                    <div className='flex flex-col justify-center items-center h-lvh gap-4 px-1'>
                            <div className="flex flex-col items-center justify-center  gap-4">
                                { taskNoCompleted && taskNoCompleted.length > 0 ? 
                                    (
                                        <>
                                            {taskNoCompleted.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                    id={item.id}
                                                    initialStatusCompleted={item.completed}
                                                    onTaskRemoved={handleTaskRemoved}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center absolute bottom-10'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        <ChevronLeftIcon className={`size-6 ${currentPage !== 1 ? 'hover:text-slate-950 cursor-pointer' : ''}`}/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        <ChevronRightIcon className={`size-6 ${totalPages !== 1 && totalPages !== currentPage ? 'hover:text-slate-950 cursor-pointer' : ''}`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : 
                                    (
                                        <p> Nenhuma tarefa pendente. </p>
                                    )
                                }
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value={itens[2]}>
                    <div className='flex flex-col justify-center items-center h-lvh gap-4 px-10'>
                            <div className="flex flex-col items-center gap-4">
                                { taskCompleted && taskCompleted.length > 0 ? 
                                    (
                                        <>
                                            {taskCompleted.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                    id={item.id}
                                                    initialStatusCompleted={item.completed}
                                                    onTaskRemoved={handleTaskRemoved}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center absolute bottom-10'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        <ChevronLeftIcon className={`size-6 ${currentPage !== 1 ? 'hover:text-slate-950 cursor-pointer' : ''}`}/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        <ChevronRightIcon className={`size-6 ${totalPages !== 1 && totalPages !== currentPage ? 'hover:text-slate-950 cursor-pointer' : ''}`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : 
                                    (
                                        <p> Nenhuma tarefa concluida. </p>
                                    )
                                }
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </Dialog.Root>
        

    )
}