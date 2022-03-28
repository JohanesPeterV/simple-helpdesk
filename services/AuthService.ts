import axios from "axios";
import {NextRouter} from "next/router";

const SERVICE_NAME = 'auth';
export default class AuthService {
    static logOut(router: NextRouter) {
        axios.post('/api/' + SERVICE_NAME + '/logout').then(() => {
            router.reload();
        });
    }

}



