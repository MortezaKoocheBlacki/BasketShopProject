import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

import { shortenText } from "../helper/helper";

import { decrease, increase, removeItem } from "../features/cart/cartSlice";

import styles from "./BasketCard.module.css";

function BasketCard({ data }) {
      const { id, image, title, quantity } = data;

      const dispatch = useDispatch();

      return (
            <div className={styles.card}>
                  <img 
                        src={image} 
                        alt={shortenText(title, 10)} 
                        onError={(e) => e.target.src = "/path/to/fallback-image.jpg"}
                  />
                  <p>{shortenText(title, 30)}</p>

                  <div className={styles.actions}>
                        {quantity === 1 && (
                              <button onClick={() => dispatch(removeItem(id))}>
                                    <MdDeleteOutline />
                              </button>
                        )}

                        {quantity > 1 && (
                              <button onClick={() => dispatch(decrease(id))}>-</button>
                        )}

                        <span>{quantity}</span>

                        <button onClick={() => dispatch(increase(id))}>+</button>
                  </div>
            </div>
      );
}

export default BasketCard;
