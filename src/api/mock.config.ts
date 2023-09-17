import MockAdapter from "axios-mock-adapter";
import data from "./mock-data/data.json";
import { AxiosInstance } from "axios";
let clientList = data.clients;

export const isMockEnabled = () => {
    return process.env.REACT_APP_MOCK_ENABLED === 'true'
};

export const initializeAxiosMockAdapter = (instance: AxiosInstance) => {
    const mock = new MockAdapter(instance);
    //mock.onGet(/\/countries\/\d+/).reply(config =>   getCountry(config));
    mock.onGet("/users/auth").reply(() => getLoggedInUserData());
    mock.onGet("/clients").reply( () => getClientList());
    mock.onPost("/client").reply( (client) => createClient(client));
};


export const createClient = (client:any) => {
    console.log(client);
    return [ 200, clientList];
}

export const getLoggedInUserData = () => {
    return [ 200, data["auth-user"] ]
}

export const getClientList = () => {
    return [200, clientList]
};

// export const getCountry = (config:any) => {
//     const id = extractIdPathParamFromUrl(config);
//     const country = clientList.find(c => c.id === id);
//     return [200, country];
// };



// const extractIdPathParamFromUrl = (config) => {
//     return config.url.split('/').pop();
// };




