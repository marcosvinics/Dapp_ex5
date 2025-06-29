import { useState, useEffect } from 'react';
import { to_do_backend } from 'declarations/to_do_backend';

function tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [totalEmAndamento, setTotalEmAndamento] = useState(0);
  const [totalConcluidas, setTotalConcluidas] = useState(0);

  useEffect(() => {
    consultarTarefas();
    totalTarefasEmAndamento();
    totalTarefasConcluidas();
  }, []);
  
  async function consultarTarefas(){
      setTarefas(await to_do_backend.getTarefas());    
  }

  // NOVA FUNÇÃO: Obter total de tarefas em andamento
  async function totalTarefasEmAndamento(){
    const total = parseInt(await to_do_backend.totalTarefasEmAndamento());
    setTotalEmAndamento(total);
  }

  // NOVA FUNÇÃO: Obter total de tarefas concluídas
  async function totalTarefasConcluidas(){
    const total = parseInt(await to_do_backend.totalTarefasConcluidas());
    setTotalConcluidas(total);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const idTarefa = event.target.elements.idTarefa.value;
    const categoria = event.target.elements.categoria.value;
    const descricao = event.target.elements.descricao.value;    
    const urgente = ((event.target.elements.urgente.value === "false") ? false : true);

    alert(urgente);

    /* Caso o idTarefa for null siginifica que é um novo cadastro,
       desta forma será executada a função addTarefa do Canister de backend,
       caso contrário será executada a função de alteração dos dados de uma tarefa */
    if( idTarefa === null || idTarefa === ""){
        await to_do_backend.addTarefa(descricao, categoria, false, false);            
    } else {
        await to_do_backend.alterarTarefa( parseInt(idTarefa), categoria, descricao, urgente, false );    
    }
    
    consultarTarefas();
    // Atualiza os totais após incluir/alterar uma tarefa
    totalTarefasEmAndamento();

    event.target.elements.idTarefa.value = "";
    event.target.elements.categoria.value = "";
    event.target.elements.descricao.value = "";    
    event.target.elements.urgente.value = "";
  }

  async function excluir(id) {        
    await to_do_backend.excluirTarefa( parseInt(id));    
    consultarTarefas();
    // Atualiza os totais após excluir uma tarefa
    totalTarefasEmAndamento();
    totalTarefasConcluidas();
  }

  async function alterar( id, categoria, descricao, urgente, concluida) {      
    await to_do_backend.alterarTarefa( parseInt(id), categoria, descricao, urgente, concluida );    
    consultarTarefas();
    // Atualiza os totais após concluir/desconcluir uma tarefa
    totalTarefasEmAndamento();
    totalTarefasConcluidas();
  }

  async function editar( id, categoria, descricao, urgente ) {              
        document.getElementById('formTarefas').elements['idTarefa'].value = id;
        document.getElementById('formTarefas').elements['categoria'].value = categoria;
        document.getElementById('formTarefas').elements['descricao'].value = descricao; 
        document.getElementById('formTarefas').elements['urgente'].value = urgente; 
        alert(document.getElementById('formTarefas').elements['urgente'].value);
  }

  return (
    <main className="mt-[30px] mx-[30px]">
        <form id="formTarefas" className="flex space-x-4" onSubmit={handleSubmit}>
            <div className="w-[15%]">
                <select id="categoria" className="block w-full px-4 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Casa">Casa</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Estudo">Estudo</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Compras">Compras</option>
                    <option value="Projetos">Projetos</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            
            <div className="w-[85%] relative">
                <input type="text" id="descricao" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Adicione uma tarefa" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar</button>
            </div>
            <input type="hidden" name="idTarefa" />
            <input type="hidden" name="urgente" />
        </form>
        
        <br/>

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Tarefas em andamento</h5>                    
            </div>

            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    { tarefas.filter((ta) => !ta.concluida).map((ta) => (
                        <li key={ta.id} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="shrink-0">                                
                                    <a onClick={ () => { alterar(ta.id, ta.categoria, ta.descricao, !ta.urgente, ta.concluida) } } className="cursor-pointer" >
                                        { /* apresenta estrela cinza */ }
                                        { !ta.urgente && (
                                        <svg className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        )}
                                        { /* apresenta estrela amarela */ }
                                        { ta.urgente && (
                                            <svg className="w-6 h-6 ms-2 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg> 
                                        )}                
                                    </a>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        { ta.categoria } 
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        { ta.descricao } 
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    
                                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        <a onClick={ () => { alterar(ta.id, ta.categoria, ta.descricao, ta.urgente, !ta.concluida) } } className="cursor-pointer" >
                                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                            </svg>
                                        </a>                                    
                                    </span>                                
                                
                                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        <a onClick={ () => { editar(ta.id, ta.categoria, ta.descricao, ta.urgente) } } className="cursor-pointer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit" >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" />
                                            </svg>
                                        </a>
                                    </span>

                                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        <a onClick={ () => { excluir(ta.id) } } className="cursor-pointer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                        </a>
                                    </span>
                                    
                                </div>
                            </div>
                        </li>
                     ))}                             
                        
                    </ul>
            </div>
            
            {/* NOVO: Totalizador de tarefas em andamento */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">TOTAL:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalEmAndamento}</span>
                </div>
            </div>
        </div>

        <br/>

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Tarefas concluídas</h5>                    
            </div>

            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    { tarefas.filter((ta) => ta.concluida).map((ta) => (
                        <li key={ta.id} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="shrink-0">                                                                    
                                    { /* apresenta estrela cinza */ }
                                    { !ta.urgente && (
                                    <svg className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    )}
                                    { /* apresenta estrela amarela */ }
                                    { ta.urgente && (
                                        <svg className="w-6 h-6 ms-2 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg> 
                                    )}                                                    
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        { ta.categoria } 
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        { ta.descricao } 
                                    </p>
                                </div>                                
                            </div>
                        </li> 
                        ))}                     
                        
                    </ul>
            </div>
            
            {/* NOVO: Totalizador de tarefas concluídas */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">TOTAL:</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{totalConcluidas}</span>
                </div>
            </div>
        </div>

    </main>
  );
}

export default tarefas;
