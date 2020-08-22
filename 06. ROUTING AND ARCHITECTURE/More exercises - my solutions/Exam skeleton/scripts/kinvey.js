import { JSON } from "sammy";

const kinvey = (() => {
    const BASE_URL = 'https://baas.kinvey.com';
    const APP_KEY = 'kid_Byq-FK9Y4';
    const APP_SECRET = 'de43b71c4b6f49a6a07f8953d7b41423';

    function makeAuth(auth) {
        if (auth === 'basic') {
            return {
                'Authorization': `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`,
                'Content-Type': 'application/json'
            }
        } else {
            return { 
                'Autorization': 'Kinvey ' + sessionStorage.getItem('authtoken')
             }
        }
    }

    function makeRequest(method, collection, endpoint, auth) {
        return {
            url: `${BASE_URL}/${collection}/${APP_KEY}/${endpoint}`,
            method,
            headers: makeAuth(auth)
        }
    }

    function get() {

    }

    function post(collection, endpoint, auth, data) {
        let req = makeRequest('POST', collection, endpoint, auth);
        req.data = data;
        console.log(req);
        return $.ajax(req)
    }

    function update() {

    }

    function remove() {

    }
    return {
        get,
        post,
        update,
        remove
    }
})()