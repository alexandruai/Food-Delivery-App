import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const initialCart = useSelector((state) => state.cart);
  const [cart, setCart] = useState(initialCart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        setCart({ products: [], total: 0 }); // Reset the cart locally
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (productId) => {
    const newProducts = cart.products.filter(product => product._id !== productId);
    const newTotal = newProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    setCart({ products: newProducts, total: newTotal });
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Produs</th>
              <th>Nume Produs</th>
              <th>Extra Topping</th>
              <th>Pret</th>
              <th>Cantitate</th>
              <th>Total</th>
              <th />
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.length === 0 ? (
                      <span> Nu s-au adaugat extra toppinguri</span>
                    ) : (
                      product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text} </span>
                      ))
                    )}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price} Lei</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity} Lei
                  </span>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Sterge Produs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>TOTAL COS</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> {cart.total} Lei
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> 0.00 Lei
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> {cart.total} Lei
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                PLATA CASH LA LIVRARE
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Ac3aHTrr7NgaN5GxLErsCUy8zLz3ytjf4LgK3kN-whdF01EYTzuymFcoUNpNc62r9mdbRVdcEJuGg3Gn",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              PLATESTE ACUM!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;