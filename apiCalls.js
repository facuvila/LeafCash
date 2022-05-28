import React, {useState} from 'react';
const axios = require('axios');

export function getUserData(id) {
    const [userData, setUserData] = useState([]);

    axios.get('https://leafcash.herokuapp.com/getUserData', { params: { id: id } })
    .then(function (resp) {
        setUserData(resp.data);
    });
    

    return userData;
}

export function transfer(target, amount) {
    axios.post(`https://leafcash.herokuapp.com/transaction`, null, 
        { params: {
            idOrigen: 1, 
            idDestino: target,
            monto: amount
        }}
    )
}

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL