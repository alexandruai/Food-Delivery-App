import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const initialPrice = pizza.prices && pizza.prices.length > 0 ? pizza.prices[0] : 0;
  const [price, setPrice] = useState(initialPrice);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSizeChange = (e, sizeIndex) => {
    const checked = e.target.checked;
    if (checked) {
      const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference);
    } else {
      setSize(0); // Revert to default size if unchecked
      changePrice(pizza.prices[0] - price); // Adjust price to initial price
    }
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>{price} Lei</span>
        <p className={styles.desc}>{pizza.desc}</p>
        {(pizza.title.toLowerCase().includes("pizza") || pizza.title.toLowerCase().includes("meniu")) && (
          <><h3 className={styles.choose}>Alege Marimea</h3><div className={styles.sizes}>
            <div className={styles.size}>
              <input
                type="checkbox"
                id="sizeSmall"
                name="sizeSmall"
                className={styles.checkbox}
                onChange={(e) => handleSizeChange(e, 0)}
                checked={size === 0} />
              <label htmlFor="sizeSmall">
                <span className={styles.number}>Mic</span>
              </label>
            </div>
            <div className={styles.size}>
              <input
                type="checkbox"
                id="sizeMedium"
                name="sizeMedium"
                className={styles.checkbox}
                onChange={(e) => handleSizeChange(e, 1)}
                checked={size === 1} />
              <label htmlFor="sizeMedium">
                <span className={styles.number}>Mediu</span>
              </label>
            </div>
            <div className={styles.size}>
              <input
                type="checkbox"
                id="sizeLarge"
                name="sizeLarge"
                className={styles.checkbox}
                onChange={(e) => handleSizeChange(e, 2)}
                checked={size === 2} />
              <label htmlFor="sizeLarge">
                <span className={styles.number}>Mare</span>
              </label>
            </div>
          </div></>
        )}

        <h3 className={styles.choose}>Adauga ingrediente extra</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.length > 0 ? (
            pizza.extraOptions.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="double">{option.text}</label>
              </div>
            ))
          ) : (
            <p>Acest produs nu are extra toppinguri disponibile</p>
          )}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Adauga in Cos
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;