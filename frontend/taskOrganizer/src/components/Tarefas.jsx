import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tarefas.css';
import DeleteIcon from '/DeleteIcon.svg';

const API_URL = 'https://api-taskorganizer.vercel.app';

function Tarefas({ userDados, pesquisa }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [clicado, setClicado] = useState(false); // Gerenciar estado clicado

    const buscarTarefas = async () => {
        try {
            const response = await axios.get(`${API_URL}/tarefas/${userDados.username}`);
            if (response.data && response.data.tasks) {
                const tarefasFormatadas = response.data.tasks.map(task => ({
                    ...task,
                    titleEdit: task.title,
                    descriptionEdit: task.description
                }));
                setTarefas(tarefasFormatadas);
                setTarefasFiltradas(tarefasFormatadas);
            }
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            setMensagem('Erro ao buscar tarefas');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    useEffect(() => {
        buscarTarefas();
    }, [userDados.username]);

    useEffect(() => {
        if (pesquisa.trim() === '') {
            setTarefasFiltradas(tarefas);
        } else {
            const tarefasFiltradas = tarefas.filter(tarefa =>
                tarefa.title.toLowerCase().includes(pesquisa.toLowerCase()) ||
                tarefa.description.toLowerCase().includes(pesquisa.toLowerCase())
            );
            setTarefasFiltradas(tarefasFiltradas);
        }
    }, [pesquisa, tarefas]);

    const adicionarTarefa = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/adicionar-tarefa`, { username: userDados.username, title, description });
            if (response.data && response.data.task) {
                const novaTarefa = {
                    ...response.data.task,
                    titleEdit: response.data.task.title,
                    descriptionEdit: response.data.task.description
                };
                setTarefas(prevTarefas => [...prevTarefas, novaTarefa]);
                setTarefasFiltradas(prevTarefas => [...prevTarefas, novaTarefa]);
                setMensagem('Tarefa adicionada com sucesso!');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            setMensagem('Erro ao adicionar tarefa');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const editarTarefa = async (index, e) => {
        e.preventDefault();
        try {
            const { titleEdit, descriptionEdit } = tarefas[index];
            const response = await axios.post(`${API_URL}/editar-tarefa`, {
                username: userDados.username,
                title: titleEdit,
                description: descriptionEdit,
                index
            });

            if (response.data && response.data.task) {
                const tarefasAtualizadas = [...tarefas];
                tarefasAtualizadas[index] = {
                    ...response.data.task,
                    titleEdit: response.data.task.title,
                    descriptionEdit: response.data.task.description
                };
                setTarefas(tarefasAtualizadas);
                setTarefasFiltradas(tarefasAtualizadas);
                setMensagem('Tarefa editada com sucesso!');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            }
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
            setMensagem('Erro ao editar tarefa');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const deletarTarefa = async (index, e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${API_URL}/deletar-tarefa/${userDados.username}/${index}`);
            if (response.status === 200) {
                const tarefasAtualizadas = tarefas.filter((_, i) => i !== index);
                setTarefas(tarefasAtualizadas);
                setTarefasFiltradas(tarefasAtualizadas);
                setMensagem('Tarefa excluída com sucesso!');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            setMensagem('Erro ao excluir tarefa');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    return (
        <div className='w-full p-5 text-sky-900 flex flex-col items-center'>
            <div className="flex flex-wrap justify-center">
                {tarefasFiltradas.map((tarefa, index) => (
                    <form onSubmit={(e) => editarTarefa(index, e)} key={tarefa.id || index} className='relative flex flex-col border-2 items-center bg-blue-200 w-full sm:w-1/2 sm:mx-5 md:w-1/3 lg:w-1/4 min-h-60 p-2 m-3 rounded-lg'>
                        <label>Tarefa:</label>
                        <input
                            type="text"
                            value={tarefa.titleEdit}
                            onBlur={(e) => {
                                e.preventDefault();
                                if (!clicado) {
                                    setMensagem("Confirm changes with the 'Edit' button");
                                    setShowMessage(true);
                                    setClicado(true);

                                    setTimeout(() => {
                                        setShowMessage(false);
                                        setClicado(false);
                                    }, 3000);
                                }
                            }}
                            onChange={(e) => {
                                const newTitle = e.target.value;
                                setTarefas(prevTarefas => prevTarefas.map((t, idx) => idx === index ? { ...t, titleEdit: newTitle } : t));
                            }}
                            className='text-2xl font-semibold w-full bg-blue-200 mb-4 rounded-2xl p-2 outline-none hover:border hover:border-blue-700 text-sky-700'
                            maxLength={30}
                        />
                        <input
                            type="text"
                            value={tarefa.descriptionEdit}
                            onBlur={(e) => {
                                e.preventDefault();
                                if (!clicado) {
                                    setMensagem("Confirm changes with the 'Edit' button");
                                    setShowMessage(true);
                                    setClicado(true);

                                    setTimeout(() => {
                                        setShowMessage(false);
                                        setClicado(false);
                                    }, 3000);
                                }
                            }}
                            onChange={(e) => {
                                const newDescription = e.target.value;
                                setTarefas(prevTarefas => prevTarefas.map((t, idx) => idx === index ? { ...t, descriptionEdit: newDescription } : t));
                                setMensagem("Confirm changes with the 'Edit' button");
                                setShowMessage(true);
                                setTimeout(() => setShowMessage(false), 3000);
                            }}
                            className='font-semibold w-full bg-blue-200 rounded-2xl p-2 outline-none hover:border hover:border-blue-700 text-sm'
                            maxLength={230}
                        />
                        {/* Renderiza somente as tags que começam com '#' */}
                        {tarefa.descriptionEdit && (
                            <p className='description mt-2'>
                                {tarefa.descriptionEdit.split(' ').filter(part => part.startsWith('#')).map((tag, idx) => (
                                    <span 
                                        key={idx} 
                                        className='bg-blue-500 text-white px-2 py-1 rounded-full mx-2 hover:bg-blue-600 transition duration-300 my-4'
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </p>
                        )}
                        <a onClick={(e) => deletarTarefa(index, e)} className='text-sky-950 flex items-center justify-center mt-2 cursor-pointer mb-12'>
                            Deletar <img src={DeleteIcon} alt="Delete Icon" className='' />
                        </a>
                        <button type='submit' className='absolute bottom-2 left-1/2 -translate-x-1/2 p-2 w-11/12 rounded-md border-2 border-blue-500'>Editar</button>
                    </form>
                ))}

                <form onSubmit={adicionarTarefa} className="flex flex-col border-2 items-center bg-slate-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-w-64 md:min-h-32 min-h-60 p-2 m-2 rounded-lg">
                    <h2 className='font-semibold text-2xl text-blue-600'>Adicionar Tarefa</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='text-2xl font-semibold w-full bg-slate-200 mb-4 rounded-2xl p-2 outline-none hover:border hover:border-blue-700 text-sky-700'
                        maxLength={30}
                        placeholder='Título da Tarefa'
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='font-semibold w-full bg-slate-200 rounded-2xl p-2 outline-none hover:border hover:border-blue-700 text-sm'
                        maxLength={230}
                        placeholder='Descrição da Tarefa'
                    />
                    <button type='submit' className='mt-4 p-2 rounded-md border-2 border-blue-500'>Adicionar</button>
                </form>
            </div>

            {showMessage && (
                <div className='fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-green-500 text-white text-center p-2 rounded-md'>
                    {mensagem}
                </div>
            )}
        </div>
    );
}

export default Tarefas;
