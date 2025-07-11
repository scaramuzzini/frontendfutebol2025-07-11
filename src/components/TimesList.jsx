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

    return (
        <>
            <h1>Lista de Times de Futebol {times.length}</h1>
            <AddTime onNewTime={handleNewTime} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {times
                        .map((t) => (
                            <tr>
                                <td>{t.id}</td>
                                <td>{t.nome}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                
        </>
    )
}

export default TimesList;