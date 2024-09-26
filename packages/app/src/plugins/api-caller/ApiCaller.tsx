import React, { useState } from 'react';
import axios from 'axios';

const ApiCaller = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [requestData, setRequestData] = useState({});
  const [response, setResponse] = useState(null);

  const handleApiCall = async () => {
    try {
      // Customize the request here
      const customHeaders = {
        'Content-Type': 'application/json',
        // Add other headers or configurations
      };

      const modifiedRequestData = {
        ...requestData,
        // Modify the requestData if needed
      };

      const result = await axios({
        method: 'post', // or 'get', depending on your needs
        url: apiUrl,
        data: modifiedRequestData,
        headers: customHeaders
      });

      setResponse(result.data);
    } catch (error) {
      console.error('Error calling API: ', error);
      setResponse(null);
    }
  };

  return (
    <div>
      <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)} placeholder="Enter API URL" />
      <textarea value={JSON.stringify(requestData, null, 2)} onChange={e => setRequestData(JSON.parse(e.target.value))} placeholder="Enter Request Data" />
      <button onClick={handleApiCall}>Call API</button>
      <div>
        Response: {response ? JSON.stringify(response, null, 2) : 'No response'}
      </div>
    </div>
  );
};

export default ApiCaller;
