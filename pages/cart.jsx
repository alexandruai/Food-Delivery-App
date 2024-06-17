import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset, removeProduct } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const initialCart = useSelector((state) => state.cart);
  const [cart, setCart] = useState(initialCart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const currency = "RON";
  const style = { layout: "vertical" };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", {
        ...data,
        products: cart.products
      });
      //const res = await axios.post("http://localhost:3000/api/orders", data);
      console.log("ceva")
      if (res.status === 201) {
        dispatch(reset());
        return res.data._id;
      //  router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log("Eroare");
      console.log(err);
    }
  };
  const handleDelete = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = cart.products.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    const newTotal = updatedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setCart({ products: updatedProducts, total: newTotal });
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
          forceReRender={[cart.total, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: cart.total,
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
                phone: "077777777",
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
          <thead>
            <tr className={styles.trTitle}>
              <th>Produs</th>
              <th>Nume Produs</th>
              <th>Extra Topping</th>
              <th>Pret</th>
              <th>Cantitate</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <br />
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
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        handleQuantityChange(product._id, product.quantity - 1)
                      }
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        handleQuantityChange(product._id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
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