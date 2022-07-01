import React from 'react';
import {Link} from 'react-router-dom';
import './listaaluno.css';

function ListaAlunos(props){
    
    return <table className="table table-hover table-bordered">
            <thead>
            <tr className="table-secondary">
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefone</th>
                <th scope="col" className="col-acao"></th>
            </tr>
            </thead>
            <tbody>

            {
                props.arrayAlunos.map((aluno) => {
                    return <tr key={aluno.id}>
                    <th scope="row">{aluno.id}</th>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.fone}</td>
                    <td>
                        <Link to={'/app/editaraluno/' + aluno.id}><i className="fas fa-edit icone-acao"></i></Link>
                        <Link to='#' onClick={() => props.clickDelete(aluno.id)}><i className="far fa-trash-alt icone-acao red"></i></Link>
                    </td>
                </tr>
                })
            }
                       
            
            </tbody>
        </table>
}

export default ListaAlunos;