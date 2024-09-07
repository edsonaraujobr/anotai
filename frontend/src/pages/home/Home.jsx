import { ChevronLeftIcon, ChevronRightIcon, PlusCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import { PhotoMenu } from '../../components/PhotoMenu';
import { Task } from '../../components/Task';
import { useState, useEffect } from "react"
import * as Dialog from '@radix-ui/react-dialog'; 
import { useNavigate } from "react-router-dom"

export function Home () {
    const itens = ["Todas tarefas", "Tarefas pendentes", "Tarefas concluidas"]
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [task, setTask] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

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
            const response = await fetch(`http://localhost:3030/getAtendimentos?page=${page}&limit=3`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify( {id:clerk.id} )
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTask(data.results);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const logout = () => {
        navigate("/")
    }
    return (
        <Dialog.Root>
            <div className='flex flex-col bg-gray-900 w-lvw h-lvh text-lime-500 fixed'>
                <Tabs.Root>
                    <header className="flex py-4 px-10 justify-between items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-950 w-full h-14 text-lime-500">
                        <Tabs.List className='flex gap-8' >
                            {itens.map((item) => (
                                <Tabs.Trigger key={item} value={item}>
                                    {item}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        <PhotoMenu
                            onClickedExit={logout}
                        />
                    </header>
                    <div className='flex-grow flex items-end justify-end px-10 py-2'>
                        <Dialog.Trigger>
                            <button
                                type="button"
                                className='bg-green-700 hover:bg-green-600 rounded-md flex justify-center items-center gap-1 p-1 text-sm text-white'
                            >
                                <PlusCircledIcon />
                                Adicionar tarefa
                            </button>
                        </Dialog.Trigger>
                    </div>
                    <Dialog.Portal>
                        <Dialog.Overlay className='inset-0 fixed bg-black/70'/>
                        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-[15vw] md:h-[35vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                            <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                                <Cross1Icon/>
                            </Dialog.Close>
                            <form className='flex w-full h-full justify-center items-center text-white'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <h2 className='font-bold'>Tipo de refeição</h2>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-cafe-manha" value="café" required />
                                            <label htmlFor="id-cafe-manha">Café da manhã</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-almoco" value="almoço"  required/>
                                            <label htmlFor="id-almoco">Almoço</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="refeicao" id="id-jantar" value="jantar"  required />
                                            <label htmlFor="id-jantar">Jantar</label>
                                        </div>
                                    </div>
                                    <button 
                                        type="submit"
                                        className='w-full bg-green-600 rounded-md hover:bg-green-700'
                                    >
                                        Iniciar
                                    </button>
                                </div>
                                
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                    <Tabs.Content value={itens[0]}>
                        <div className='flex flex-col justify-center items-center h-lvh gap-4 px-10'>
                            <div className="flex flex-col  gap-4">
                                { task.length > 0 ? 
                                    (
                                        <>
                                            {task.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className='cursor-pointer'
                                                    >
                                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        className=' cursor-pointer'
                                                    >
                                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
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
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value={itens[1]}>
                    <div className='flex flex-col justify-center items-center h-lvh gap-4 px-10'>
                            <div className="flex flex-col  gap-4">
                                { task.length > 0 ? 
                                    (
                                        <>
                                            {task.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className='cursor-pointer'
                                                    >
                                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        className=' cursor-pointer'
                                                    >
                                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
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
                            <div className="flex flex-col  gap-4">
                                { task.length > 0 ? 
                                    (
                                        <>
                                            {task.map((item, index) => (
                                                <Task
                                                    key={index}
                                                    title={item.title}
                                                    description={item.description}
                                                    date={item.createdAt}
                                                />
                                            ))}
                                            <div className='flex justify-center gap-2  items-center'>
                                                <div className='bg-slate-700 flex gap-0 rounded-full'>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className='cursor-pointer'
                                                    >
                                                        <ChevronLeftIcon className='size-6 hover:text-slate-950'/>
                                                    </button>
                                                    <span>{currentPage} de {totalPages}</span>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        className=' cursor-pointer'
                                                    >
                                                        <ChevronRightIcon className='size-6 hover:text-slate-950'/>
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