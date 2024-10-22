import React from 'react';

function Tarefas({ tasks }) {
    return (
        <div>
            {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <div key={index} className='border p-2 mb-2'>
                        {task}
                    </div>
                ))
            ) : (
                <div>Sem Tarefas!</div>
            )}

            <form className="flex flex-col border-2 bg-slate-200 w-1/6 p-2">
                <input type="text" name='title' placeholder='Title' className='w-full mb-2 rounded-md pl-2' />
                <div className="w-full flex justify-center items-center">
                    Completed? <div className='ml-2 w-6 border-2 border-blue-500 bg-white aspect-square rounded-full'></div>
                </div>
            </form>
        </div>
    );
}

export default Tarefas;
