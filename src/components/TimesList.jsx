import axios from 'axios';
import {useState, useEffect} from 'react';
import AddTime from './AddTime';

const headers = {
    "ngrok-skip-browser-warning": "123"
}

function TimesList() {

    const [times, setTimes] = useState([]);

    useEffect(() => {
        fetchTimes();
    },[]);

    const fetchTimes = async() => {
        axios.get('https://0cc77e37a64d.ngrok-free.app/times', {
            headers: headers
        }
        ).then(function(response) {
            setTimes(response.data);
        }).catch(function (error) {
            console.error(error);
        })
        ;
    }

    const handleNewTime = (novoTime) => {
        setTimes([...times, novoTime]);
    }

    const handleDelete = async (id) => {
        axios.delete(`https://0cc77e37a64d.ngrok-free.app/times/${id}`, {
            headers: headers
        }).then(function(response) {
            setTimes(times.filter(t=>t.id !== id));
        }).catch(function (error) {
            console.error(error);
        })
        ;
    }

    return (
        <>
            <h1>Lista de Times de Futebol {times.length}</h1>
            <AddTime onNewTime={handleNewTime} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Títulos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {times
                        .map((t) => (
                            <tr>
                                <td>{t.id}</td>
                                <td>{t.nome}</td>
                                <td>{t.titulos}</td>
                                <td>Editar | <button onClick={() => handleDelete(t.id)}>Remover</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                
        </>
    )
}

export default TimesList;