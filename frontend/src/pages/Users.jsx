import React, {useEffect} from 'react'
import Layout from './Layout'
import Userlist from '../components/Userlist'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Users = () => {
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
  if(user && user.role !== 'admin') {
    navigate("/dashboard", { state: { error: "You do not have permission to access this page." } });
}
}, [isError, message, user, navigate]);
  return (
    <Layout>
      <Userlist />
    </Layout>
  )
}

export default Users
