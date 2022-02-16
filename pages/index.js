import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('api/names-lookup')
      .then((res) => res.json())
      .then((data) => {
        setNames(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Head>
        <title>Dex aggregator</title>
        <meta
          name="description"
          content="See your total holdings accross uniswap pools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {names.map(([address, name], i) => (
          <div key={i}>
            {address}: {name}
          </div>
        ))}
      </div>
    </div>
  );
}
