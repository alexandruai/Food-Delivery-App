import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {

  if (!Array.isArray(pizzaList)) {
    return <div>No pizzas available</div>;
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Satisfy your cravings with just a click.
        Delicious food, delivered to your doorstep. 
        Indulge in delectable flavors, delivered straight to your door.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;