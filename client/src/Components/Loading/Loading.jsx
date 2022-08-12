import React from "react";
import load from "../../assets/images/GIF-2.gif";
import styles from "../../Components/Loading/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.contenedorLoading}>
      <img src={load} alt="loading" />
    </div>
  );
}
