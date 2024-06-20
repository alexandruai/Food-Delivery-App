import axios from "axios";
import PizzaList from "../components/PizzaList";
//import styles from "../styles/Home.module.css";
//import styles from "../styles/Admin.module.css";
import styles from "../styles/Products.module.css";

export default function Products({ pizzaList, admin }) {
    return (
        <div className={styles.container}>
            <PizzaList pizzaList={pizzaList} />
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    let admin = false;

    if (myCookie.token === process.env.TOKEN) {
        admin = true;
    }

    const res = await axios.get("http://localhost:3000/api/products");
    return {
        props: {
            pizzaList: res.data,
            admin,
        },
    };
};