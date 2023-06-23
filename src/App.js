import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };
  //PRATICA 1
  const saveLocalStorage = () => {
    const listaString = JSON.stringify(listaCompras);
    localStorage.setItem("lista", listaString);
  };
  //PRATICA 2
  const getItensLocalStorage = () => {
    //peguei do local storage
    //const listaString = localStorage.getItem("lista");
    //transformei em array
    //const listaArray = JSON.parse(listaString);

    //lógica em 1 linha
    const listaArray = JSON.parse(localStorage.getItem("lista"));
    //condicional para clicar em pegar sem dar erro
    //if(listaArray) { setListaCompras(listaArray)}
    listaArray && setListaCompras(listaArray);
  };

  const removerItemLocalStorage = () => {
    localStorage.removeItem('lista')
    setListaCompras([])

  }

  //acontece 1x quando minha página é montada
  useEffect(() => {
    getItensLocalStorage();
  }, []);
  //acontece toda vez que o estado listaCompras é atualizado
  useEffect(() => {
    //se listaCompras estiver zerada
    //não entra nesse if - não salva a lista vazia

    //
    if (listaCompras.length) {
      saveLocalStorage();
    }
    //listaCompras.length && saveLocalStorage();
  }, [listaCompras]);

  
  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <button onClick={removerItemLocalStorage}>Remove do Local Storage</button>
      {/*<button onClick={saveLocalStorage}>Salvar no Local Storage</button>*/}
      {/*<button onClick={getItensLocalStorage}>Pegar do Local Storage</button>*/}

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
