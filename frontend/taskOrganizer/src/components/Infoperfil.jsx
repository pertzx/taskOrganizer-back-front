import React from 'react'

function Infoperfil({Nome = "UserName"}) {
    

    var iniciais = '';
    function Iniciais(n){
        var NomeSeparado = n.split(" ");
        for(let i = 0; i< NomeSeparado.length; i++){
            iniciais = iniciais + NomeSeparado[i][0];
        }
        return iniciais.toUpperCase();
    }
    
    return (
    <div className='flex justify-center items-center' translate='no'>
        <div className='flex h-10 aspect-square bg-gray-400 rounded-full items-center justify-center'>{Iniciais(Nome)}</div>
        <div className='ml-2 flex flex-col justify-center'>
            <h4>{Nome.toUpperCase()}</h4>
        </div>
    </div>
  )
}

export default Infoperfil