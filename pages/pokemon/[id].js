import { useRouter } from "next/router";
import Head from "next/head";
// import Image from "next/image";
import styles from "../../styles/Home.module.css";
// import { useState, useEffect } from "react";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://634d38a3f5d2cc648e9fc5a7.mockapi.io/api/tester"
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
    `https://634d38a3f5d2cc648e9fc5a7.mockapi.io/api/tester/${params.id}`
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
    revalidate: 10,
  };
}
export default function Details({ pokemon }) {
  //   useEffect(() => {
  //     const resp = await fetch(
  //       `https://634d38a3f5d2cc648e9fc5a7.mockapi.io/api/tester/1.json`
  //     );
  //     console.log(await resp.json());
  //   }, []);

  console.log(pokemon, "test pokemon");
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
      <img className={styles.image} src={pokemon.avatar} alt={pokemon.name} />
      <h3>Name: {pokemon.name}</h3>
      <h3>Created At: {pokemon.createdAt}</h3>
      {/* <table>
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
      </table> */}
    </div>
  );
}

//test222
