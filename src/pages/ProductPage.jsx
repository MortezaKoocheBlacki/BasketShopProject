import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from "../features/product/productSlice";
import { useSelector, useDispatch } from 'react-redux';

import styles from "./ProductPage.module.css";

import Card from '../components/Card';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';

import { filterProducts, getInitialQuery, searchProducts } from '../helper/helper';
import SideBar from '../components/SideBar';

function ProductPage() {
      const dispatch = useDispatch()

      const {products, loading} = useSelector(store => store.product);
      console.log(products);

      const [searchParams, setSearchParams] = useSearchParams();
      const [displayed, setDisplayed] = useState([]);
      const [search, setSearch] = useState("");
      const [query, setQuery] = useState({});
      
      useEffect(() => {
            dispatch(fetchProducts());
      }, []);
      
      useEffect(() => {
            setDisplayed(products);
            
            setQuery(getInitialQuery(searchParams));
      }, [products]);
      
      useEffect(() => { 
            setSearchParams(query);
            setSearch(query.search || "");
            let finalProducts = searchProducts(products, query.search);
            finalProducts = filterProducts(finalProducts, query.category);

            setDisplayed(finalProducts); 
      }, [query]);


      return (
            <>
                  <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
                  <div className={styles.container}>
                        <div className={styles.products}>
                              {loading && <Loader />}
                              {displayed.map((product) => {
                                    return <Card key={product.id} product={product} />
                              })}
                        </div>
                        <SideBar query={query} setQuery={setQuery} />
                  </div>
            </>
      );
}

export default ProductPage