import axios from "axios";
import { useRouter } from 'next/router';
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const HistoryOrders = ({ orders }) => {
    const router = useRouter();
    const [orderList, setOrderList] = useState(orders);
    const statusLabels = ["Platita", "Preparare", "Pe Drum", "Livrat"];

    const handleBack = () => {
        router.push('/admin'); // Redirect back to admin page
    };

    const handleStatus = async (id) => {
        const item = orderList.find(order => order._id === id);
        const currentStatus = item.status;

        try {
            const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter(order => order._id !== id),
            ]);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`http://localhost:3000/api/orders/${id}`);
                setOrderList(orderList.filter(order => order._id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getStatusLabel = (status) => {
        if (status === 0) return statusLabels[0];
        if (status === 1) return statusLabels[1];
        if (status === 3) return statusLabels[2];
        if (status >= 4) return statusLabels[3];
        return "";
    };

    return (
        <div>
            <br />
            <div className={styles.container}>
                <button className={styles.button} onClick={handleBack}>Produse</button>
            </div>
            <br />
            <div className={styles.container}>
                <div className={styles.item}>
                    <h1 className={styles.title}>Istoric Comenzi</h1>
                    <br />
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <th>Id</th>
                                <th>Client</th>
                                <th>Total</th>
                                <th>Metoda Plata</th>
                                <th>Status</th>
                                <th>Contact</th>
                                <th>Updateaza Comanda</th>
                                <th>Sterge Comanda</th>
                            </tr>
                        </thead>
                        <br />
                        <tbody>
                            {orderList.map((order) => (
                                <tr key={order._id} className={styles.tr}>
                                    <td className={styles.td}>{order._id}</td>
                                    <td className={styles.td}>{order.customer}</td>
                                    <td className={styles.td}>{order.total} Lei</td>
                                    <td className={styles.td}>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                                    <td className={styles.td}>{getStatusLabel(order.status)}</td>
                                    <td className={styles.td}>{order.phone}</td>
                                    <td className={styles.td}>
                                        <button
                                            className={`${styles.button} ${order.status >= 4 ? styles.disabledButton : ""}`}
                                            disabled={order.status >= 4}
                                            onClick={() => handleStatus(order._id)}
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                    <td className={styles.td}>
                                        <button
                                            className={styles.button}
                                            onClick={() => handleDelete(order._id)}
                                        >
                                            Sterge Comanda
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