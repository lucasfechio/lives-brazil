import React, { useEffect, useState } from "react";

import Head from "next/head";
import { db } from "../config/firebase";

export default function Home() {
  const [livesList, setLivesList] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dateNow = new Date();
    setLoading(true);
    db.collection("lives")
      .doc(
        `${dateNow.getDate()}${dateNow.getMonth() + 1}${dateNow.getFullYear()}`
      )
      .get()
      .then((doc) => {
        setLivesList(
          doc.data().lives.map((live, position) => ({
            ...live,
            id: `${dateNow.getTime()}_${position}`,
          }))
        );
        setLoading(false);
      })
      .catch((err) => console.log("Error getting document", err));
    setDate(
      `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`
    );
  }, []);

  return (
    <div className="container">
      <Head>
        <title>LIVE Brasil</title>
      </Head>

      <main>
        <h1 className="title">
          <span>LIVE</span>Brasil
        </h1>
        <p className="description">Lives {date}</p>
        <div className="grid">
          {loading ? (
            <span>Buscando lives...</span>
          ) : (
            livesList.map((live) => (
              <a
                key={live.name}
                className="card"
                href={`/details?id=${live.id}`}
              >
                <img className="live-image" src={live.imageUrl} alt="" />
                <p>{live.name}</p>
              </a>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
