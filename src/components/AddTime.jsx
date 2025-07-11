import axios from 'axios';
import {useState, useEffect} from 'react';

const headers = {
    "ngrok-skip-browser-warning": "123"
}


const AddTime = ({onNewTime}) => {
    const [nome, setNome] = useState('');
    const [titulos, setTitulos] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoTime = {
            nome,
            titulos
        };

        axios.post('https://0cc77e37a64d.ngrok-free.app/times', 
            novoTime,
            {
                headers: headers
            }
        ).then(function(response) {
            onNewTime(response.data);
            setNome('');
            setTitulos(0);
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
                <label>Títulos:</label>
                <input type="text" value={titulos} onChange={(e) => setTitulos(e.target.value)} />
                <button type="submit">Adicionar time</button>
            </form>
        </>
    )
}

export default AddTime;