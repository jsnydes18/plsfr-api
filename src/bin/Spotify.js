const fetch = require('node-fetch-commonjs')

class SpotifyApi {
  #clientId;
  #clientSecret;
  #url = 'https://api.spotify.com';

  constructor(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
        throw new Error('No Token Provided');
    }
    this.#clientId = clientId;
    this.#clientSecret = clientSecret
  }

  authorize = async () => {
    const authString = `${this.#clientId}:${this.#clientSecret}`
    const authBuffer = (new Buffer.alloc(authString.length, authString).toString('base64'));
    const headers = {
      'Authorization': `Basic ${authBuffer}`,
      'Content-Type': 'application/json'
    };
    console.log(headers)
    const url = 'https://accounts.spotify.com/api/token';
    const res = await fetch(url, {
        method: 'POST',
        headers: headers
    });
    
    const data = await res.text();

    return data;
  };


}

module.exports = {
  SpotifyApi
}; 