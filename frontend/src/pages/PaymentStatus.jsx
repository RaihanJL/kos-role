import React, { useEffect } from "react";
import Layout from "./Layout";
import PaymentStatus from "../components/PaymentStatus";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const PaymentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/", { state: { error: message } });
    }
    // Jika ingin hanya user yang bisa akses, bisa tambahkan pengecekan role di sini
  }, [isError, message, user, navigate]);

  return (
    <Layout>
      <PaymentStatus />
    </Layout>
  );
};

export default PaymentsPage;
