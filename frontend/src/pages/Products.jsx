import React, {useEffect} from 'react'
import Layout from './Layout'
import ProductList from '../components/ProductList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";


const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
  if (isError) {
    navigate("/", { state: { error: message } }); // kirim pesan error
    // Jangan dispatch(reset()) di sini!
  }
}, [isError, message, navigate]);
  return (
    <Layout>
      <ProductList/>
    </Layout>
  )
}

export default Products
