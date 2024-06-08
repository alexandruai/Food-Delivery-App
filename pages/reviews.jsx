import Head from 'next/head';
import { useState } from 'react';

const Reviews = () => {
  const [reviews] = useState([
    {
      customerName: 'John Doe',
      comment: 'Serviciu excelent! Mâncarea a sosit fierbinte și delicioasă. Cu siguranță voi comanda din nou.'
    },
    {
      customerName: 'Jane Smith',
      comment: 'O varietate bună de opțiuni. Livrarea a fost rapidă și mâncarea a avut un gust proaspăt.'
    },
    {
      customerName: 'Sam Brown',
      comment: 'Absolut delicios! Mi-a plăcut fiecare mușcătură. Recomand cu căldură.'
    }
  ]);

  return (
    <div>
      <Head>
        <title>Reviews - Food Delivery App</title>
        <meta name="description" content="Review-uri de la clientii multumiti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Reviewuri de la clientii nostri</h1>
        <br />
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.customerName}</strong>
              <p> 
                {review.comment}
              </p>
              <br />
            </li>
            
          ))}
        </ul>
      </main>

      <footer>
      </footer>

      <style jsx>{`
        main {
          padding: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 20px;
        }

        strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Reviews;