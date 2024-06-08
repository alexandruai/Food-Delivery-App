import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";

const Index = ({ orders, products }) => {
  const router = useRouter();
  const [close, setClose] = useState(true);
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparare", "pe drum", "livrat"];

  const handleEdit = async (id) => {
    router.push(`/admin/editProduct/${id}`);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {<AddButton setClose={setClose} />}
      {!close && <Add setClose={setClose} />}
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Produse</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Poza</th>
              <th>Id</th>
              <th>Titlu Produs</th>
              <th>Pret</th>
              <th>Optiuni</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0]} Lei</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Sterge
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Comenzi</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Client</th>
              <th>Total</th>
              <th>Plata</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Optiuni</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total} Lei</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>platita</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>{order.phone}</td>
                <td>
                  <button className={styles.button} onClick={() => handleStatus(order._id)}>
                    Updateaza Status
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
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

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;