import React, { useState } from 'react';
import {Link, Redirect}  from 'react-router-dom';
import Navbar from '../Components/Navbar/navbar';
import './novoaluno.css';
import firebase from '../Config/firebase';

function NovoAluno(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [curso, setCurso] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('N');
    const db = firebase.firestore();

    function CadastrarAluno(){

      if (nome.length === 0){
        setMensagem('Informe o nome');
      }
      else if (email.length === 0){
        setMensagem('Informe o e-mail');
      }
      else{
          db.collection('alunos').add({
            nome: nome,
            email: email,
            fone: fone,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            curso: curso
  
          }).then(() => {
            setMensagem('');
            setSucesso('S');
          }).catch((erro) =>{
            setMensagem(erro);
            setSucesso('N');
          })
        }
      }

    return <div>
        <Navbar/>
        <div className="container-fluid titulo">

          <div className="offset-lg-3 col-lg-6">
            <h1>Novo Aluno</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nome</label>
                <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Fone</label>
                <input  onChange={(e) => setFone(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">CEP</label>
                <input onChange={(e) => setCep(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Logradouro</label>
                <input onChange={(e) => setLogradouro(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Numero</label>
                <input onChange={(e) => setNumero(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Bairro</label>
                <input onChange={(e) => setBairro(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Cidade</label>
                <input onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">UF</label>
                <input onChange={(e) => setUf(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Curso</label>
                <input onChange={(e) => setCurso(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />              
              </div>
              <div className="text-center">
                <Link to="/app/home" className="btn btn-outline-primary btn-acao">Cancelar</Link>
                <button onClick={CadastrarAluno} type="button" className="btn btn-primary btn-acao">Salvar</button>
              </div>

              {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
              {sucesso === 'S' ? <Redirect to='/app/home' /> : null}

            </form>
          </div>
        </div>
    </div>;  
  }

export default NovoAluno;