import { useState } from "react";
import Link from "next/link";
import styles from "../styles/OrderDetail.module.css";


const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    if (total <= 50) {
      total += 5;  // Adăugăm 5 lei la total pentru livrare
    }
    createOrder({ customer, address, total, method: 0 });
    setClose(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {total <= 50 ? (
          <h1 className={styles.title}>Livrare standard 5 lei</h1>
        ) : (
          <h1 className={styles.title}>Livrare gratuită</h1>
        )}
        <div className={styles.item}>
          <label className={styles.label}>Nume Prenume</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Numar Telefon</label>
          <input
            type="text"
            placeholder="+40 770 777 777"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Adresa</label>
          <textarea
            rows={5}
            placeholder="Strada Sperantei 777"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <br/>
        <button className={styles.button} onClick={handleClick}>
          Comanda
        </button>
        <p>
          <br />
          <Link href="/products" passHref>
              Ma Mai Gandesc
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;