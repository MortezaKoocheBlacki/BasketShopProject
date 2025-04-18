import { TbListDetails, TbShoppingBagCheck } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';

import { productQuantity, shortenText } from '../helper/helper';

import { Link } from 'react-router-dom';

import styles from "./Card.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrease, increase, removeItem } from '../features/cart/cartSlice';

function Card({product}) {
      const { id, title, image, price } = product;

      const state = useSelector((store) => store.cart); 
      const dispatch = useDispatch()

      const quantity = productQuantity(state, id);

      return (
            <div className={styles.card}>
                  <img src={image} alt={title} style={{width: "150px"}} />
                  <h3>{shortenText(title)}</h3>
                  <p>{price}</p>
                  <div className={styles.actions}>
                        <Link to={`/products/${id}`}> <TbListDetails /> </Link>
                        <div>
                              {
                                    quantity === 1 &&
                                          (<button onClick={() => dispatch(removeItem(product))}>
                                                <MdDeleteOutline />
                                          </button>)
                              }
                              {
                                    quantity > 1 &&
                                    (<button onClick={() => dispatch(decrease(product))}>
                                          -
                                    </button>)
                              }
                              {!!quantity && <span>{quantity}</span>}
                              {
                                    quantity === 0 ?
                                          (<button onClick={() => dispatch(addItem(product))}>
                                                <TbShoppingBagCheck />
                                          </button>) :
                                          (<button onClick={() => dispatch(increase(product))}>
                                                +
                                          </button>)
                              }
                              
                        </div>
                  </div>
            </div>
      );
}

export default Card