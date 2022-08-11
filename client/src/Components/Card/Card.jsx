import React from "react";
import styles from "../../Components/Card/Card.module.css";

export default function Card({ image, origin, species, episodes, name }) {
  return (
    <div className={styles.cardHome}>
      <div>
        <img className={styles.imgCard} src={image} alt="imagen" />
      </div>
      <div className={styles.dataCard}>
        <p className={styles.h1Card}>{name}</p>
        <div className={styles.textBody}>
          <p>Origin: {origin}</p>
          <p>Species:{species}</p>
          <p>Episodes:{episodes}</p>
        </div>
      </div>
    </div>
  );
}
