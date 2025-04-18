import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SiOpenproject } from 'react-icons/si';
import { IoPricetag } from 'react-icons/io5';
import { FaArrowLeft } from 'react-icons/fa';

import styles from "./DetailsPage.module.css";

import Loader from "../components/Loader";
import { fetchProducts } from '../features/product/productSlice';

function DetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]); 

    const productDetails = useSelector((store) => 
        store.product.products.find((item) => item.id === Number(id))
    );

    if (!productDetails) {
        return (
            <div className={styles.notFound}>
                <p>Product not found. Please try again.</p>
                <Link to="/products">
                    <FaArrowLeft />
                    <span> Back To Shop </span>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <img 
                src={productDetails.image} 
                alt={productDetails.title} 
                onError={(e) => e.target.src = "/path/to/fallback-image.jpg"}
            />
            <div className={styles.information}>
                <h3 className={styles.title}>{productDetails.title}</h3>
                <p className={styles.description}>{productDetails.description}</p>
                <p className={styles.category}>
                    <SiOpenproject />
                    {productDetails.category}
                </p>
                <div>
                    <span className={styles.price}>
                        <IoPricetag />
                        {productDetails.price} $
                    </span>
                    <Link to="/products">
                        <FaArrowLeft />
                        <span> Back To Shop </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
