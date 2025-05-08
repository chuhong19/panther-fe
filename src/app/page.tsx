'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [pingResponse, setPingResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch('http://localhost:5070/api/ping');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setPingResponse(data.message);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError('Error calling API: ' + err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchPing();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div>
        <h1 className='text-4xl font-bold text-blue-600'>
          Welcome to Panther FE!
        </h1>
        {error && <p className='text-red-600'>{error}</p>}
        {pingResponse && <p className='text-green-600'>{pingResponse}</p>}
      </div>
    </div>
  );
}
