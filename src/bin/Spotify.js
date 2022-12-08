import fetch from "node-fetch";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const API_ENDPOINT = "https://api.spotify.com/v1";

class Spotify {
  #clientId;

  #clientSecret;

  #authorization;

  constructor(clientId, clientSecret, authorization) {
    if (!clientId || !clientSecret) {
      throw new Error("No Token Provided");
    }
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#authorization = authorization;
  }

  /**
   * Handles the Client Credentials Flow and returns a ready SpotifyApi Interface
   * Client Credentials Flow: https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
   *
   * @param {string} clientId
   * @param {string} clientSecret
   * @returns {Spotify}
   */
  static async createClient(clientId, clientSecret) {
    const fetchOptions = {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${Buffer(`${clientId}:${clientSecret}`).toString(
          "base64"
        )}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };
    const res = await fetch(TOKEN_ENDPOINT, fetchOptions);
    const body = await res.json();
    return new Spotify(clientId, clientSecret, body);
  }

  // SpotifyAPI Interfaces
  genreSearch = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#authorization.access_token}`,
      },
    };
    const res = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      options
    );
    const body = await res.json();

    return body;
  };

  search = async (q, type, offset = 0, limit = 20) => {
    const body = [
      `q=${q}`,
      `type=${type}`,
      `offset=${offset}`,
      `limit=${limit}`,
    ].join("&");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#authorization.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    };
    const response = await fetch(`${API_ENDPOINT}/search`, options);
    const result = await response.json();

    return result;
  };
}

export { Spotify };
