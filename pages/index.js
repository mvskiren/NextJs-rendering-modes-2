import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export async function getStaticProps() {
  const resp = await fetch(
    "https://634d38a3f5d2cc648e9fc5a7.mockapi.io/api/tester"
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
        <title>Static Site Generation App</title>
      </Head>
      <h2>
        Rendering Mode- <span style={{ color: "green" }}>SSG-revalidate-10</span>
      </h2>
      <div className={styles.flex}>
        {pokemons.map((pokemon) => (
          <div className={styles.grid_item} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  className={styles.image}
                  src={pokemon.avatar}
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
