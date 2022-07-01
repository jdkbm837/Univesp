import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../Components/Navbar/navbar';
import ListaAlunos from '../Components/ListaAluno/listaaluno';
import './home.css';

import firebase from '../Config/firebase';
import 'firebase/firestore';

import SweetAlert from 'react-bootstrap-sweetalert';

function Home(){

  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState('');
  const [texto, setTexto] = useState('');
  const [excluido, setExcluido] = useState('');
  const [confirmacao, setConfirmacao] = useState(false);
  const [confirmacaoId, setConfirmacaoId] = useState('');

  function deleteUser(id){
      firebase.firestore().collection('alunos').doc(id).delete().then(() => {
        setExcluido(id);
        setConfirmacao(false);
      })
  }

  function confirmDeleteUser(id){
    setConfirmacaoId(id);
    setConfirmacao(true);
  }
  
  useEffect(function(){
    let listaAlu = [];
    
      firebase.firestore().collection('alunos').get().then(async function(resultado){
          await resultado.docs.forEach(function(doc){
              if (doc.data().nome.indexOf(busca) >= 0) {
                listaAlu.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        email: doc.data().email,
                        fone: doc.data().fone
                    });
                }
          })

          setAlunos(listaAlu);
      })
    }, [busca, excluido]);

    return <div>
      <Navbar/>
      <div className="container-fluid titulo">
        <h1>Cadastro de Alunos</h1>

        <div className="row">
          <div className="col-4">
            <Link to='/app/novoaluno' className="btn btn-primary" type="button"><i className="fas fa-plus"></i> Aluno</Link>
          </div>

          <div className="col-8">
            <div className="input-group mb-3">
              <input onChange={(e) => setTexto(e.target.value)} type="text" className="form-control" placeholder="Pesquisar por nome" aria-describedby="button-addon2" />
              <button onClick={(e) => setBusca(texto)} className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i> Pesquisar</button>
            </div>
          </div>
        </div>        
 
        <ListaAlunos arrayAlunos={alunos} clickDelete={confirmDeleteUser} />

        {
          confirmacao ? <SweetAlert
                        warning
                        showCancel
                        showCloseButton
                        confirmBtnText="Sim"
                        confirmBtnBsStyle="danger"
                        cancelBtnText="Não"
                        cancelBtnBsStyle="light"
                        title="Exclusão"
                        onConfirm={() => deleteUser(confirmacaoId)}
                        onCancel={() => setConfirmacao(false)}          
                        reverseButtons={true}
                      >
                        Deseja excluir o aluuno selecionado?
                      </SweetAlert> : null }

      </div>      
    </div>
  }

export default Home;