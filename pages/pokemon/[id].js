import { useRouter } from "next/router";
import Head from "next/head";
// import Image from "next/image";
import styles from "../../styles/Home.module.css";
// import { useState, useEffect } from "react";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}
export default function Details({ pokemon }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
      }}
    >
      <img
        className={styles.image}
        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
        alt={pokemon.name}
      />
      <h3>Name: {pokemon.name}</h3>
      <p>Types: {pokemon.type.join(",")}</p>
      <h1 style={{ textAlign: "center" }}>Stats</h1>
      <table>
        <thead className={styles.header}>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.stats.map(({ name, value }) => (
            <tr key={name}>
              <td className={styles.attribute}>{name}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//test222
