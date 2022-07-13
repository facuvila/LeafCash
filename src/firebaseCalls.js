import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from './firebaseConfig';

initializeApp(firebaseConfig);
const functions = getFunctions();
const GetUserData = httpsCallable(functions, 'getUserData');
const CreateTransaction = httpsCallable(functions, 'createTransaction');
const AlikeUsernames = httpsCallable(functions, 'alikeUsernames');

//getUserData will receive an UID and return its retrieved data.
async function getUserData(uid) {
    return GetUserData({ uid: uid })
    .then((result) => {
        return result.data;
    });
}

//createTransaction will receive target's uid and transaction amount, and call CreateTransaction.
async function createTransaction(target, amount) {
    CreateTransaction({ uid: target, amount: amount })
}

async function alikeUsernames(emailStr, limit){
    return await AlikeUsernames({ emailStr: emailStr, limit: limit })
    .then((result) => {
        return result.data;
    });
}

export { getUserData, createTransaction, alikeUsernames }