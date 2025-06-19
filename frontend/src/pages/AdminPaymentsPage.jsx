import React, { useEffect } from "react";
import Layout from "./Layout";
import AdminPayments from "../components/AdminPayments";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AdminPaymentsPage = () => {
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
    if (user && user.role !== "admin") {
      navigate("/dashboard", {
        state: { error: "You do not have permission to access this page." },
      });
    }
  }, [isError, message, user, navigate]);

  return (
    <Layout>
      <AdminPayments />
    </Layout>
  );
};

export default AdminPaymentsPage;