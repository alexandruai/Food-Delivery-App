// pages/contact.js
import Head from 'next/head';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us - Food Delivery App</title>
        <meta name="description" content="Contact us for any inquiries or feedback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Feel free to reach out to us for any inquiries, feedback, or support.</p>

        <h2>Contact Details</h2>
        <p>Email: info@example.com</p>
        <p>Phone: +1 123-456-7890</p>
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