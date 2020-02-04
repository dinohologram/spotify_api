const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

async function getToken() {
    return await fetch(`https://accounts.spotify.com/authorize`, {
        "client_id": process.env.CLIENT_ID 
    });
}
async function spotifyApi(search) {
    try {
        let data = await fetch(`https://api.spotify.com/v1/search/${search}`, {
            "method": "GET",
            "headers" : {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        return await data.json()
    } catch (error) {
       console.error(error);
    }
}

async function spotifyApi2(q,type='artist') {
    try {
        let data = await fetch(`https://api.spotify.com/v1/search/?q=${q}&type=${type}`, {
            "method": "GET",
            "headers" : {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        return await data.json()
    } catch (error) {
       console.error(error);
    }
}

async function display() {
    console.log(await getToken());
}

display()

async function objectParse() {
    try {
        let spotifyResponse = spotifyApi2('grimes');

        for(artist in await spotifyResponse.artists.items) {
            console.log(spotifyResponse.artists.items[artist].name);
        }
    } catch (error) {
        console.error(error);
    }    
}
 