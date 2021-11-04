import Axios from "axios";
import { DOMAIN, TOKEN } from "../utils/settings/config";

export class baseServices {
    post = (url, data) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    put = (url, data) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) },
        })
    }
}