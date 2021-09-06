/**
 * Este archivo realiza las operaciones con mis datos de usuario, es decir,
 * CRUD de BBDD o filesystem o objetos en memoria (va a ser en este caso)
 */

/** 
 * LISTA DE USUARIOS EN MEMORIA COMO SI FUESE UNA COLLECTION DE 
 * BBDD
 */

import { MongoClient } from "mongodb";

const DATABASE_URL = 'mongodb+srv://immo_company:Q2DfwuJLeS3cyZld@immosensingapp.xxx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const userList = [
    {
        email: 'blabla@bla.com',
        password: '123456',
        age: 21,
        status: 'SUCCESS'
    },
    {
        email: 'bleble@ble.com',
        password: '1234567',
        age: 22,
        status: 'SUCCESS'
    }
]

/**
 * Esta función va a buscar los datos a 
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email y password o undefined si no lo encuentra
 */
export const getUserInfoByIdAndPassword = (userId, password) => {
    return userList.find(u => u.email.toLowerCase() === userId?.toLowerCase()
        && u.password === password
        && u.status === 'SUCCESS');
}

/**
 * Esta función va a buscar los datos a 
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email o undefined si no lo encuentra
 */
export const getUserInfoById = (userId) => {
    return userList.find(u => u.email.toLowerCase() === userId?.toLowerCase() && u.status === 'SUCCESS');
}


/**
 * Crea un usuario en donde se guardan los datos. La password ya vendra codificada
 * Tenemos que poner el status para que se sepa que está pending validation
 */
 export async function registerUser(email, password) {

    console.log("primer console")

    // const authInfo = user.split(' ');

    // const decodeAuthInfo = Buffer.from(authInfo[1], 'base64').toString();

    // const userInfo = decodeAuthInfo.split(':');

    const client = await MongoClient.connect(DATABASE_URL);

    console.log("segundo console")
    // const query = { email: userInfo[0], password: userInfo[1] }

    const user = { email: email, password: password, status: "PENDING_EMAIL_VALIDATION" }

    const data = await client.db('immosensingddbb')
        .collection('user')
        .insertOne(user)
        console.log("tercer console")
        client.close();
    if (data !== null) return true;

}


/**
 * Cambia el estado del usuario a SUCCESS
 */
export const updateUserMailVerification = (email) => {
    console.log(email);
    const i = userList.findIndex(u => u.email.toLowerCase() === email?.toLowerCase());
    userList[i].status = 'SUCCESS';
}




