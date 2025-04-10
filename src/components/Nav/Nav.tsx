import Link from "next/link";
import styles from "./Nav.module.scss";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <h2>Utils</h2>
      </div>
      <div>
        <ul className={styles.navList}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/sort-lines"}>Sort Lines</Link>
          </li>
          <li>
            <Link href={"/russ-ipsum"}>Russ Ipsum</Link>
          </li>
          <li>
            <Link href={"/ipsum-generator"}>Ipsum Generator</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
