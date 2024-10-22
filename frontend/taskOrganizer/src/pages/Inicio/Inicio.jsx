import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Tarefas from '../../components/Tarefas.jsx';

function Inicio({ username, tarefasArray }) {
    return (
        <>
            <Navbar userName={username} />
            <Tarefas tasks={tarefasArray}/>
        </>
    )
}

export default Inicio