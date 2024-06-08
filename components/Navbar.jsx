import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>COMANDA ACUM</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/" passHref>
              <a>Acasa</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/products" passHref>
              <a>Meniu</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/" passHref>
              <Image src="/img/logo.png" alt="" width="160px" height="69px" />
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/reviews" passHref>
              <a>Reviews</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/contact" passHref>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;