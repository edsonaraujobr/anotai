import { Cross1Icon, Cross2Icon, CheckIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, GearIcon, CheckboxIcon, BoxIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import moment from "moment";
import * as Dialog from '@radix-ui/react-dialog'; 
import { Toaster, toast } from 'sonner'

export function Task({title, description, date, id, initialStatusCompleted, onTaskRemoved }) {
    const [completed, setCompleted] = useState(initialStatusCompleted)
    const [titleTaskLocale, setTitleTaskLocale] = useState(title);
    const [descriptionTaskLocale, setDescriptionLocale] = useState(description)
    const [open, setOpen] = useState(false);

    const handleCompletedTask = () => {
        const newCompleted = !completed
        fetchCompletedTask(newCompleted);
    }

    const fetchCompletedTask = async (newCompleted) => {
        try {
            const token = localStorage.getItem('user_authToken');
            const response = await fetch(`http://localhost:3030/task/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({completed: newCompleted}),
            });
    
            if (response.ok) {
                setCompleted(newCompleted);
            } else {
                toast.error('Erro ao atualizar tarefa')
            }
        } catch (error) {
            toast.error('Erro com o servidor.')
        }
    }

    const fetchRemoveTask = async () => {
        try {
            const token = localStorage.getItem('user_authToken');
            const response = await fetch(`http://localhost:3030/task/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                toast.success('Tarefa removida com sucesso')
                onTaskRemoved()
            } else {
                toast.error('Erro ao criar tarefa')
            }
        } catch (error) {
            toast.error('Erro com o servidor.')
        }
    }

    const fetchUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('user_authToken');
            const response = await fetch(`http://localhost:3030/task/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({title: titleTaskLocale, description: descriptionTaskLocale}),
            });
    
            if (response.ok) {
                toast.success('Tarefa atualizada com sucesso')
                setOpen(false);
            } else {
                toast.error('Erro ao atualizar tarefa')
            }
        } catch (error) {
            toast.error('Erro com o servidor.')
        }
    }


    const handleChangeTitle = (e) => {
        setTitleTaskLocale(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescriptionLocale(e.target.value)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
        <main className="flex md:flex-row justify-between items-center gap-8 md:gap-36 border rounded-md p-1 md:p-4 text-white w-full max-w-[1200px] hover:scale-105 duration-300 transition ease-in-out delay-15">
          <div className="flex justify-center items-center gap-4">
            {completed ? (
              <CheckboxIcon className="size-14 hover:text-green-600 cursor-pointer" onClick={handleCompletedTask} />
            ) : (
              <BoxIcon className="size-14 hover:text-green-600 cursor-pointer" onClick={handleCompletedTask} />
            )}
      
            <div>
              <h2 className="text-lg md:text-xl font-black">{title}</h2>
              <p className="text-sm md:text-base font-light text-justify">{description}</p>
              <span className="text-xs">Criado em {moment(date).format('DD-MM-YYYY')} às {moment(date).format('HH:mm:ss')}</span>
            </div>
          </div>
      
          <div className="flex gap-4 justify-center items-center mt-4 md:mt-0">
            <Dialog.Trigger onClick={() => setOpen(true)}>
              <GearIcon className="size-6 hover:text-blue-600 cursor-pointer" />
            </Dialog.Trigger>
            <Cross2Icon className="size-7 hover:text-red-600 cursor-pointer" onClick={fetchRemoveTask} />
          </div>
        </main>
      
        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/70" />
          <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] max-w-[35vw] md:h-[50vh] bg-gradient-to-b from-gray-800 to-gray-900 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute top-0 right-0 bg-gray-800 p-1.5 text-lime-400 hover:text-lime-600">
              <Cross1Icon />
            </Dialog.Close>
      
            <form className="flex flex-col w-full h-full justify-center items-center text-white p-4" onSubmit={fetchUpdateTask}>
              <div className="flex flex-1 flex-col justify-center gap-1 w-full max-w-[400px]">
                <input
                  type="text"
                  placeholder="Título"
                  required
                  value={titleTaskLocale}
                  onChange={handleChangeTitle}
                  className="bg-transparent border border-gray-700 px-4 outline-none text-lime-500 placeholder-lime-600"
                  maxLength={100}
                />
                <textarea
                  type="text"
                  placeholder="Descrição"
                  value={descriptionTaskLocale}
                  onChange={handleChangeDescription}
                  required
                  className="bg-transparent border border-gray-700 px-4 outline-none h-48 resize-none text-lime-500 placeholder-lime-600"
                />
              </div>
              <button type="submit" className="bg-lime-700 rounded-md hover:bg-lime-800 px-4 mt-4">
                Salvar alterações
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      

    )
}