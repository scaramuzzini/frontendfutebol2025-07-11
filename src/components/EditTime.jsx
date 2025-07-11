import axios from 'axios';
import React, { useEffect, useState } from 'react';

const headers = {
    "ngrok-skip-browser-warning": "123"
}

const EditTime = ({time, onTimeEdit}) => {
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (time) {
            setNome(time.nome);
        }
    }, [time])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const timeEditado = {
            nome
        };

        axios.put(`https://0cc77e37a64d.ngrok-free.app/times/${time.id}`, 
            timeEditado,
            {
                headers: headers
            }
        ).then(function(response) {
            setNome('');
            onTimeEdit(response.data);
        }).catch(function (error) {
            console.error(error);
        })
        ;

    }

    return (
        <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <button type="submit">Editar time</button>
            </form>
    )
}

export default EditTime;