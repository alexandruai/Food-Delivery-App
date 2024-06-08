import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div> */}
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            DOSPIM, COACEM SI GATIM CEA MAI BUNA MANCARE 
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>LOCATIILE NOASTRE</h1>
          <p className={styles.text}>
            Strada Stravopol 5
            <br /> Bucuresti, 85022
          </p>
          <p className={styles.text}>
            Bulevardul Calea Vitan 23
            <br /> Bucuresti, 85022
          </p>
          <p className={styles.text}>
            Bulevardul Calea Victoriei 33
            <br /> Bucharest, 85022
          </p>
          <p className={styles.text}>
            Bulevardul Bucurestii Noi 777
            <br /> Bucuresti, 85022
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>PROGRAMUL NOSTRU</h1>
          <p className={styles.text}>
            DE LUNI PANA VINERI
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            LA SFARSIT DE SAPTAMANA
            <br /> 12:00 – 24:00
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>CONTACT</h1>
          <p className={styles.text}>
            Email: info@example.com
            <br />
          </p>
          <p className={styles.text}>
            Telefon: +4077777777
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;