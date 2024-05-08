import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {

  if (!Array.isArray(pizzaList)) {
    return <div>No pizzas available</div>;
  }

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  // Split pizzaList into groups of 4 items
  const pizzaChunks = chunkArray(pizzaList, 4);
  
  return (
    // <div className={styles.container}>
    //   <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
    //   <p className={styles.desc}>
    //     Satisfy your cravings with just a click.
    //     Delicious food, delivered to your doorstep. 
    //     Indulge in delectable flavors, delivered straight to your door.
    //   </p>
    //   <div className={styles.wrapper}>
    //     {pizzaList.map((pizza) => (
    //       <><PizzaCard key={pizza._id} pizza={pizza} /><br /></>
    //     ))}
    //   </div>
    // </div>

    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Satisfy your cravings with just a click.
        Delicious food, delivered to your doorstep.
        Indulge in delectable flavors, delivered straight to your door.
      </p>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pizzaChunks.map((chunk, index) => (
              <tr key={index}>
                {chunk.map((pizza) => (
                  <td key={pizza._id}>
                    <PizzaCard pizza={pizza} />
                  </td>
                ))}
                {/* If less than 4 items in the last row, fill empty cells */}
                {chunk.length < 4 && (
                  <td colSpan={4 - chunk.length}></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PizzaList;