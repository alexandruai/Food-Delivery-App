import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState(["", "", ""]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [error, setError] = useState("");

  const changePrice = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
    setExtra({ text: "", price: "" });
  };

  const handleCreate = async () => {
    if (title.toLowerCase().includes("pizza") || title.toLowerCase().includes("meniu")) {
      if (!prices[0] || !prices[1] || !prices[2] || !title || !desc || !file) {
        setError("Nu ai introdus toate datele!");
        return;
      }
    } else {
        if (!prices[0] || !title || !desc || !file) {
          setError("Nu ai introdus toate datele!");
          return;
        }
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadesFoodyExpress");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgmhzmnav/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Adauga un nou produs</h1>
        <div className={styles.item}>
          <label className={styles.label}>Poza Produs</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <br />
        <div className={styles.item}>
          <label className={styles.label}>Titlu Produs</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.item}>
          <label className={styles.label}>Descriere</label>
          <textarea
            rows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.item}>
          <label className={styles.label}>Preturi</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Mic/Standard"
              required
              value={prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Mediu"
              value={prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Mare"
              value={prices[2]}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <br />
        <div className={styles.item}>
          <label className={styles.label}>Extra Toppinguri</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Topping"
              name="text"
              value={extra.text}
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Pret"
              name="price"
              value={extra.price}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Adauga Topping
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option, index) => (
              <span key={index} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <br />
        <button className={styles.addButton} onClick={handleCreate}>
          Creaza Produsul
        </button>
        <div className={styles.error} style={{ color: "red" }}>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Add;