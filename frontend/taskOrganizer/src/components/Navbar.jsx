import React from 'react';
import Infoperfil from './Infoperfil';

function Navbar({ userName, setPesquisa }) {
    return (
        <div className='flex flex-wrap items-center justify-between border-2 border-gray-300 rounded-md m-2 p-7 sm:p-4  text-slate-200'>
            <div className='font-bold text-lg' translate='no'>TaskOrganizer</div>
            <div className='w-full sm:w-3/12 bg-gray-200 relative rounded-md hover:border-blue-500 hover:border-2 my-2 sm:my-0'>
                <input
                    type="text"
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder='Pesquisar'
                    className='outline-none bg-transparent text-sky-900 focus:text-blue-500 hover:text-blue-500 p-2 w-full rounded-md'
                />
            </div>
            <Infoperfil Nome={userName} />
        </div>
    );
}

export default Navbar;
