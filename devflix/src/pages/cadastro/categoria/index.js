import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
 
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000',
  };
  const [categorias, setCategorias] = useState([]); /* Lista de categorias */
  const [values, setValues] = useState(valoresIniciais); /* valores iniciais que aparecem nos campos */

  function setValue(chave, valor) { /* função para a criação de uma categoria */
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(event) {
    setValue(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias/';
    fetch(URL)
      .then(async (responseServer) =>{
        const response = await responseServer.json();
        setCategorias([
          ...response,
        ]);
      });
  }, [])


  return (
    <PageDefault>
      <h1>
        {' '}
        Cadastro Categoria:
        {values.nome}
      </h1>

      <Link to="/">
        Voltar para Home
      </Link>

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);
        setValues(valoresIniciais);
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />
        {/* <div>
                    <label>
                                Descrição
                            <textarea
                                name="descricao"
                                value={values.descricao}
                                onChange = {handleChange}
                            />
                    </label>
                </div> */}

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />
        {/*   <div>
                    <label>
                        Cor
                        <input
                            type="color"
                            name="cor"
                            value={values.cor}
                            onChange = {handleChange}
                        />
                     </label>
                </div>
 */}
        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading ...
        </div>
      )}
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>
    </PageDefault>
  );
}

export default CadastroCategoria;
