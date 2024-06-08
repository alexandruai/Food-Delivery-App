// pages/contact.js
import Head from 'next/head';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact - Food Delivery App</title>
        <meta name="description" content="Contact us for any inquiries or feedback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Contacteaza-ne</h1>
        <p>Ne-ar plăcea să ne auzim! Nu ezitați să ne contactați pentru orice întrebări, feedback sau suport.</p>

        <h2>Detalii Contact</h2>
        <p>Email: info@example.com</p>
        <p>Telefon: +4077777777</p>
      </main>
      <footer>

      </footer>

      <style jsx>{`
        main {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Contact;