import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');

  // URL da API (backend)
 const API_URL = 'https://projeto-livros-production.up.railway.app';

  // Buscar livros ao iniciar
  useEffect(() => {
    buscarLivros();
  }, []);

  const buscarLivros = async () => {
    try {
      const res = await axios.get(API_URL);
      setLivros(res.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const adicionarLivro = async () => {
    if (!titulo || !autor || !ano) {
      alert('Preencha todos os campos!');
      return;
    }
    try {
      await axios.post(API_URL, { titulo, autor, ano });
      setTitulo('');
      setAutor('');
      setAno('');
      buscarLivros();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const marcarComoLido = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/lido`);
      buscarLivros();
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
    }
  };

  const removerLivro = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      buscarLivros();
    } catch (error) {
      console.error('Erro ao remover livro:', error);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>📚 Meus Livros Favoritos</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <button onClick={adicionarLivro}>Adicionar</button>
      </div>

      <ul>
        {livros.map((livro) => (
          <li key={livro.id} style={{ marginBottom: 10 }}>
            <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano}){' '}
            {livro.lido ? '✅' : '❌'}
            <button onClick={() => marcarComoLido(livro.id)}>Marcar como lido</button>
            <button onClick={() => removerLivro(livro.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
