import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";

const SERVICE_NAME = 'auth';
export default class AuthService {
    static logOut() {
        return axios.post('/api/' + SERVICE_NAME + '/logout');
    }

    static logIn(userCredential: UserCredential) {
        return axios.post('/api/auth/login', userCredential);
    }
}



