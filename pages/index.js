import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemons: await resp.json(),
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Server Side Rendering App</title>
      </Head>
      <h2>
        Rendering Mode- <span style={{ color: "green" }}>SSR</span>
      </h2>
      <div className={styles.flex}>
        {pokemons.map((pokemon) => (
          <div className={styles.grid_item} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  className={styles.image}
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
