import React , { useEffect, useState} from 'react'
import logoImg from '../../assets/logo.svg'
import {Link , useHistory} from 'react-router-dom'
import {FiPower} from 'react-icons/fi'
import {FiTrash} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function Profile(){
    const [incidents, setIncidents] = useState([]) 
    const history = useHistory();
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    // buscar o nome da ONG pelo local storage
    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization : ongId,
            }
        }).then(response => { // se der correto faz:
            setIncidents(response.data)
        })
    }, [ongId]) // executar função sempre que é chamado

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers : {
                    Authorization : ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !==  id))
        }catch(err){
            alert('Erro ao deletar, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                     //valor unico de cada incident
                        <li key={incident.id}>
                            <strong>CASO</strong>
                            <p>{incident.tittle}</p>
                        
                            <strong>DESCRIÇAÕ</strong>
                            <p>{incident.description}</p>
                        
                            <strong>VALOR</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency : 'BRL'}).format(incident.value)}</p>
                        
                            <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                                <FiTrash size={20} color="r#a8a8b3"></FiTrash>
                            </button>
                        </li>
                    ))}
                
            </ul>

        </div>
    )
}