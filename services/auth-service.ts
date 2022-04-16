import axios from "axios";
import {UserCredential} from "../models/auth/user-credential";

const SERVICE_NAME = 'auth';
export default class AuthService {
    static logOut() {
        return axios.post('/api/' + SERVICE_NAME + '/logout');
    }

    static logIn(userCredential: UserCredential) {
        return axios.post('/api/' + SERVICE_NAME + '/login', userCredential);
    }

    static user() {
        return axios.post('/api/' + SERVICE_NAME + '/user');
    }

}



