import React, { useEffect } from "react";
import Layout from "./Layout";
import PaymentHistory from "../components/PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const PaymentHistoryPage = () => {
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
  }, [isError, message, user, navigate]);

  return (
    <Layout>
      <PaymentHistory />
    </Layout>
  );
};

export default PaymentHistoryPage;