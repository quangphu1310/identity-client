import React, { useState } from 'react';
import { fetchProtectedData } from '../services/testService';

const Test = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  const handleFetchData = async () => {
    const result = await fetchProtectedData();
    if (result.success) {
      setData(result.data);
      setMessage('');
    } else {
      setData(null);
      setMessage(result.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">API TEST</h2>

              <button onClick={handleFetchData} className="btn btn-primary w-100">
                Test API
              </button>

              {message && <p className="mt-3 text-center text-danger">{message}</p>}

              {data && (
                <div className="mt-3">
                  <h4 className="text-center">Dữ liệu nhận được từ API:</h4>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
