import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const router = useRouter();

  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/" passHref>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
        </Link>
        {/* <div className={styles.listItem}>
          <Link href="/" passHref>
            <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          </Link>
        </div>
        {!isAdminPage && (
          <div className={styles.texts}>
            <div className={styles.text}>COMANDA ACUM</div>
            <div className={styles.text}>012 345 678</div>
          </div>
        )} */}
      </div>
      {!isAdminPage && (
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
              <Link href="/reviews" passHref>
                <a>Recenzii</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!isAdminPage && (
        <div className={styles.item}>
          <Link href="/cart" passHref>
            <div className={styles.cart}>
              <Image src="/img/cart.png" alt="" width="30px" height="30px" />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;