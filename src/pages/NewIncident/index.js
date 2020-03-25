import React , {useState} from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

export default function NewIncident(){
    const [tittle, setTittle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleCreateIncident(e){
        e.preventDefault();

        const data = {
            tittle,
            description,
            value,
        }

        try{
            await api.post('incidents', data , {
                headers : {
                    Authorization : ongId,            }
            })
            history.push('/profile')
        }catch(err){
            alert('Erro ao criar caso, tente novamente')
        }

        

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o seu caso detalhadamente para encontra um herói para resolver seu dia</p>

                    <Link className=".back-link" to="/profile"> 
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleCreateIncident}>
                    <input placeholder="Titulo do caso"
                        value={tittle}
                        onChange={e => setTittle(e.target.value)}
                    />
                    <input placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button onChange={handleCreateIncident} className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}