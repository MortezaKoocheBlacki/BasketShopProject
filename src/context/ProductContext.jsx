import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/config';

const ProductContext = createContext();

function ProductProvider({children}) {
      const [products, setProducts] = useState([]);

      useEffect(() => {
            const fetchProduct = async () => {
                  try {
                        setProducts(await api.get("/products"));
                  } catch (error) {
                        console.log(error.message)
                  }
            };
            fetchProduct();
      }, [])

      return (
            <ProductContext.Provider value={products}>
                  {children}
            </ProductContext.Provider>
      )
}

const useProductsDetails = (id) => {
      const products = useContext(ProductContext);
      const result = products.find(product => product.id === id);
      return result;
};
const useProducts = () => {
      const products = useContext(ProductContext);
      return products;
} 
export default ProductProvider;
export { useProducts, useProductsDetails };
