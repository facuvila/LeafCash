import React, {useState} from 'react';
import loggedUser from './loggedUser';
const axios = require('axios');

export function getUserData(userName) {
    //HACE UN OBJETO userData CON LLAMADAS A API Y LO DEVUELVE
}

export function transfer(target, amount) {
    axios.post(`https://leafcash.herokuapp.com/transaction`, null, 
        { params: {
            idOrigen: userName, 
            idDestino: target,
            monto: amount
        }}
    )
}

export function getBalance() {
    const [balance, setBalance] = useState([]);
    
    axios.get('https://leafcash.herokuapp.com/getUserData', { params: { id: loggedUser.userName, campo:'balance' } })
    .then(function (resp) {
        setBalance(resp.data[0].balance);
    });
    
    return balance;
}

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL