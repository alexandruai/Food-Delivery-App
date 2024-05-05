import Head from 'next/head';
import { useState } from 'react';

const Reviews = () => {
  const [reviews] = useState([
    {
      customerName: 'John Doe',
      comment: 'Great service! The food arrived hot and delicious. Will definitely order again.'
    },
    {
      customerName: 'Jane Smith',
      comment: 'Good variety of options. Delivery was quick and the food tasted fresh.'
    },
    {
      customerName: 'Sam Brown',
      comment: 'Absolutely delicious! Loved every bite. Highly recommend.'
    }
  ]);

  return (
    <div>
      <Head>
        <title>Reviews - Food Delivery App</title>
        <meta name="description" content="Check out the reviews from our happy customers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Customer Reviews</h1>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.customerName}</strong> - {review.rating} stars<br />
              {review.comment}
            </li>
          ))}
        </ul>
      </main>

      <footer>
        {/* Add footer content if needed */}
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