import axios from 'axios';
import {useState, useEffect} from 'react';

const headers = {
    "ngrok-skip-browser-warning": "123"
}


const AddTime = ({onNewTime}) => {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoTime = {
            nome
        };

        axios.post('https://0cc77e37a64d.ngrok-free.app/times', 
            novoTime,
            {
                headers: headers
            }
        ).then(function(response) {
            onNewTime(response.data);
        }).catch(function (error) {
            console.error(error);
        })
        ;

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <button type="submit">Adicionar time</button>
            </form>
        </>
    )
}

export default AddTime;