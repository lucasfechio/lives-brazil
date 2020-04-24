import React, { useEffect, useState } from "react";

import { db } from "../config/firebase";

export default function Details() {
  const [live, setLive] = useState("");
  const [loading, setLoading] = useState(false);
  const getLiveId = () => {
    if (process.browser) {
      return location.search.split(/\?id=/)[1];
    }
  };

  useEffect(() => {
    async function getLive(timestpm, position) {
      const dateNow = new Date(parseInt(timestpm));
      const liveRef = await db
        .collection("lives")
        .doc(
          `${dateNow.getDate()}${
            dateNow.getMonth() + 1
          }${dateNow.getFullYear()}`
        )
        .get();

      setLive(liveRef.data().lives[position]);
      setLoading(false);
    }
    const [timestpm, position] = getLiveId().split("_");
    setLoading(true);
    getLive(timestpm, position);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <span>Carregando informações...</span>
      ) : (
        <div style={{ display: "flex" }}>
          <img className="live-image" src={live?.imageUrl} alt="" />
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 style={{ marginTop: 0 }}>{live?.name}</h1>
            <span style={{ marginBottom: "5px" }}>{`Data: ${live?.date}`}</span>
            <span style={{ marginBottom: "5px" }}>
              {`Horário: ${live?.startTime}`}
            </span>
            <span
              style={{ marginBottom: "5px" }}
            >{`Transmissão: ${live?.transmission?.join(" e ")}`}</span>
          </div>
        </div>
      )}
      <a href="/">
        <button
          style={{
            marginTop: "50px",
            width: "100px",
            height: "30px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </a>
    </div>
  );
}
