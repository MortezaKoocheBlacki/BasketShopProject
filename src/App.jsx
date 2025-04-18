import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/404";
import Layout from "./layout/layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
