import React, {useState} from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom' // acesasr componente sem recarregar página
// Link para :
export default function Logon(){
    const [id , setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id})
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
        }catch(err){
            alert('Falha no Login tente novamente')
        }

        history.push('/profile')
    }


    return (
            <div className="logon-container">
                <section className="form">
                    <img src={logo} alt="Be the Hero"/>
                </section>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className=".back-link" to="/register"> 
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho Cadastro
                    </Link>
                </form>

                <img src={heroesImg} alt="Heroes"/>
            </div>
    )
}