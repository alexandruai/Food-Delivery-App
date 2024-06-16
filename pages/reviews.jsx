import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [clientName, setClientName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/reviews", {
        clientName,
        reviewText,
        rating,
      });
      setReviews([...reviews, res.data]); // Update reviews state with new review
      setClientName('');
      setReviewText('');
      setRating(1);
      window.location.reload();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Reviews - Food Delivery App</title>
        <meta name="description" content="Review-uri de la clientii multumiti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <h1>Recenzii de la clientii nostri</h1>
          <table>
            <thead>
              <tr>
                <th>Nume Client</th>
                <th>Recenzie</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.clientName}</td>
                  <td>{review.reviewText}</td>
                  <td>{review.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        
        <br />
        <section>
          <h2>Lasa O Recenzie</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nume Client:
              <br />
              <br />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Recenzie:
              <br />
              <br />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Cate stelute ne acordati ?
              <br />
              <br />
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Trimite Recenzie</button>
          </form>
        </section>
      </main>

      <style jsx>{`
        main {
          padding: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        th,
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f2f2f2;
        }

        form {
          display: flex;
          flex-direction: column;
          max-width: 400px;
        }

        label {
          margin-bottom: 10px;
        }

        textarea {
          height: 100px;
        }

        button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }

        button:hover {
          background-color: #0053ba;
        }
      `}</style>
    </div>
  );
};

export default Reviews;