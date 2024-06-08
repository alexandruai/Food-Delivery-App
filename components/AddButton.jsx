import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Adauga Un Nou Produs
    </div>
  );
};

export default AddButton;