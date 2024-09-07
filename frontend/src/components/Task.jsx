import { ReloadIcon, CheckIcon, Cross2Icon, DoubleArrowLeftIcon, DoubleArrowRightIcon, GearIcon, CheckboxIcon, BoxIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function Task({title, description, date }) {
    const [completed, setCompleted] = useState(false)

    const handleCompletedTask = () => {
        setCompleted(!completed)
    }

    const handleSetTask = () => {

    }

    const handleRemoveTask = () => {

    }

    return (
        <main className='flex flex-col items-center justify-center'>
            <div className="flex justify-center items-center gap-36 border rounded-md p-4">
                <div className='flex justify-center items-center gap-4'>
                    {
                        completed ? (
                            <CheckboxIcon className='size-14 hover:text-green-600 cursor-pointer' onClick={handleCompletedTask}/>
                        ) : (
                            <BoxIcon className='size-14 hover:text-green-600 cursor-pointer' onClick={handleCompletedTask}/>
                        )
                    }
                    
                    <div className=''>
                        <h2 className='text-xl font-black'>Título</h2>
                        <p className='text-sm font-light text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam adipisci reiciendis magni earum cupiditate doloremque saepe, aspernatur cumque omnis vel, molestias exercitationem consectetur laudantium et beatae voluptate veritatis ipsum consequatur?</p>
                        <span className='text-xs'>Criado em 04 de setembro às 21:26</span>
                    </div>
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <GearIcon className='size-6 hover:text-blue-600 cursor-pointer' onClick={handleSetTask}/>
                    <Cross2Icon className='size-7 hover:text-red-600 cursor-pointer' onClick={handleRemoveTask}/>
                </div>
            </div>
        </main>
    )
}