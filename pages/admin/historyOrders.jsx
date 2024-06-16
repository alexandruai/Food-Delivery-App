import axios from "axios";
import { useRouter } from 'next/router';
import styles from "../../styles/Admin.module.css";

const HistoryOrders = ({ orders }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin'); // Redirect back to admin page
  };

  return (
    <div>
        <br />
      <button className={styles.button} onClick={handleBack}>Produse</button>
        <br />
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>History Orders</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Client</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className={styles.trTitle}>
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer}</td>
                  <td>{order.total} Lei</td>
                  <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                  <td>{order.status}</td>
                  <td>{order.phone}</td>
                  <td>
                    <button
                      className={`${styles.button} ${
                        order.status === 8 ? styles.disabledButton : ""
                      }`}
                      disabled={true} // Always disabled for history orders
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
    },
  };
};

export default HistoryOrders;