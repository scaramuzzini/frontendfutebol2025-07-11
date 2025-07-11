import axios from 'axios';
import {useState, useEffect} from 'react';
import AddTime from './AddTime';
import EditTime from './EditTime';
import { Toaster, toast } from 'sonner';

const headers = {
    "ngrok-skip-browser-warning": "123"
}

function TimesList() {

    const [times, setTimes] = useState([]);
    const [timeEmEdicao,setTimeEmEdicao] = useState(null);

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
            toast('Time removido com sucesso');
        }).catch(function (error) {
            console.error(error);
        })
        ;
    }

    const handleEdit = (time) => {
        setTimeEmEdicao(time);
    }

    const handleTimeUpdate = (timeEmEdicao) => {
        setTimes(times.map(t => (t.id === timeEmEdicao.id ? timeEmEdicao : t)));
    }

    return (
        <>
            <Toaster />
            <h1>Lista de Times de Futebol {times.length}</h1>
            <AddTime onNewTime={handleNewTime} />
            <EditTime time={timeEmEdicao} onTimeEdit={handleTimeUpdate} />
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
                                <td><button onClick={() => handleEdit(t)}>Editar</button> 
                                | <button onClick={() => handleDelete(t.id)}>Remover</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                
        </>
    )
}

export default TimesList;