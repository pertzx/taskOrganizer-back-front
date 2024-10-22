import React from 'react'
import Infoperfil from './Infoperfil'

function Navbar({userName}) {
  return (
    <div className='flex relative flex-wrap max-w-full h-14 items-center justify-between border-2 border-gray-300 rounded-md m-2 px-8'>
        <div className='font-bold' translate='no'>TaskOrganizer</div>
        <div className='w-3/12 bg-gray-200 absolute left-1/2 -translate-x-1/2 rounded-md'>
            <input type="text" placeholder='Pesquisar' className='outline-none bg-transparent p-2
            placeholder' />
        </div>
        <Infoperfil Nome={userName}/>
    </div>
  )
}

export default Navbar