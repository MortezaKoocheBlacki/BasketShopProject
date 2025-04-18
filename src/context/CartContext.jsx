import { createContext, useContext, useReducer } from 'react';
import { productsSummation } from '../helper/helper';

const CartContext = createContext();

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const isItemExists = state.selectedItems.find(item => item.id === action.payload.id);
      const updatedItems = isItemExists
        ? [...state.selectedItems]
        : [...state.selectedItems, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        selectedItems: updatedItems,
        ...productsSummation(updatedItems),
        checkout: false
      };
    }

    case "INCREASE": {
      const updatedItems = state.selectedItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        selectedItems: updatedItems,
        ...productsSummation(updatedItems)
      };
    }

    case "DECREASE": {
      const updatedItems = state.selectedItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return {
        ...state,
        selectedItems: updatedItems,
        ...productsSummation(updatedItems)
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.selectedItems.filter(item => item.id !== action.payload.id);

      return {
        ...state,
        selectedItems: updatedItems,
        ...productsSummation(updatedItems)
      };
    }

    case "CHECKOUT": {
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true
      };
    }

    default:
      throw new Error("Invalid action type");
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return [context.state, context.dispatch];
};

export default CartProvider;
export { useCart };
