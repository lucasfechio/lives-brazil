import React, { useEffect, useState } from 'react';

import { db } from '../config/firebase';

export default function Details() {
  const [live, setLive] = useState('');
  const getLiveId = () => {
    if (process.browser) {
      return location.search.split(/\?id=/)[1];
    }
  };

  useEffect(() => {
    async function getLive(timestpm, position) {
      const dateNow = new Date(parseInt(timestpm));
      const liveRef = await db
        .collection('lives')
        .doc(
          `${dateNow.getDate()}${
            dateNow.getMonth() + 1
          }${dateNow.getFullYear()}`
        )
        .get();

      setLive(liveRef.data().lives[position]);
    }
    const [timestpm, position] = getLiveId().split('_');

    getLive(timestpm, position);
  }, []);

  return (
    <div className="container">
      <img src={live?.imageUrl} />
      <span>{live?.name}</span>
    </div>
  );
}
