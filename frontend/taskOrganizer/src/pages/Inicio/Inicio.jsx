import React, { useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Tarefas from '../../components/Tarefas.jsx';

function Inicio({ username, userDados }) {
    const [pesquisa, setPesquisa] = useState('');

    return (
        <>
            <Navbar userName={username} setPesquisa={setPesquisa} />
            <div className='w-full text-slate-100 p-4'>
                <div className='flex flex-col items-center w-full mb-4'>
                    <h1 className='text-center text-lg sm:text-xl md:text-2xl lg:text-3xl'>
                        Add it to the form below, if you can't find him, it's because he's running away from you! {'>'}.{'<'}
                    </h1>
                </div>
                <div className='flex flex-col items-center w-full mb-4 mt-3'>
                    <h1 className='text-center text-md sm:text-lg md:text-xl lg:text-2xl'>
                        Tip: Add tags using <span className='text-yellow-500 font-semibold'>#tag</span>
                    </h1>
                </div>
            </div>
            <Tarefas userDados={userDados} pesquisa={pesquisa} />
            <div className='font-light text-slate-100 my-4 w-full text-center'>
                created by <span className='font-semibold'>Pyerre/P3rtzX</span><a href="https://github.com/pertzx" target='_blank'> Github for more details</a>
            </div>
        </>
    );
}

export default Inicio;
