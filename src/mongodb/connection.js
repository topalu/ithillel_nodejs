import {MongoClient} from "mongodb"


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'ithillel';

let instance = null

export async function getInstance() {

    if (instance !== null) {
        return Promise.resolve(instance)
    }

    await client.connect()
    .catch(err => console.error(err))
    
    console.log('Connected successfully to server');
    instance = client.db(dbName);

    return instance   
}