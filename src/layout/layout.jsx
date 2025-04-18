import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { Link } from "react-router-dom";

import styles from "./layout.module.css";
import { useSelector } from 'react-redux';

function Layout({ children }) {

      const state = useSelector((store) => store.cart);
      return (
            <>
                  <header className={styles.header}>
                        <Link to="/products">Basket Shop Project</Link>
                        <Link to="/checkout">
                              <div>
                                    <PiShoppingCartSimpleBold />
                                    {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
                              </div>
                        </Link>
                  </header>
                  {children}
                  <footer className={styles.footer}> <p>developed by love</p> </footer>
            </>
      );
}

export default Layout