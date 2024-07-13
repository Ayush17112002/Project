import styles from "./Error.module.css";
export default function Error(props) {
  return (
    <div className={styles.error}>
      <div className={styles.container}>{props.children}...</div>
    </div>
  );
}
