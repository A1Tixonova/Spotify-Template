import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const id = '06HL4z0CvFAxyc27GXpf02';
  const market = 'US';

  useEffect(() => {
    // Api call for retrieving token
    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer(
            'f086e433e8ae4a12ab28cbd7a0cd7581' +
              ':' +
              '0092d850e4424787bf19b48f05bed843'
          ).toString('base64'),
      },
      data: 'grant_type=client_credentials',
    })
      .then((tokenresponse) => {
        console.log(tokenresponse.data.access_token);
        setToken(tokenresponse.data.access_token);

        // Api call for retrieving tracks data
        axios(
          `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + tokenresponse.data.access_token,
            },
          }
        )
          .then((trackresponse) => {
            console.log(trackresponse.data.tracks);
            console.log(trackresponse.data.tracks.album);
            setTracks(trackresponse.data.tracks);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>qwe</div>;
}

export default App;
