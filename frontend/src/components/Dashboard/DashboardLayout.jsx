import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEYS } from '../../common/constants/localStorageKeys.constants';  
import { setIsLoading } from '@/store/loading.slice';
import { useDispatch, useSelector } from 'react-redux';

import CustomerDashboard from './CustomerDashboard/CustomerDashboard'
import ServicesProviderDashboard from './ServicesProviderDashboard/ServicesProviderDashboard'

function DashboardLayout() {

  const [userRole, setUserRole] = useState('customer');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  useEffect(() => {
    // get user role from local storage
    try {
      dispatch(setIsLoading(true));
      const role = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);
      setUserRole(role);
      
    } catch (error) {
      console.error("Failed to fetch user role", error);
      navigate("/login"); // Navigate to login if an error occurs
    } finally{
      dispatch(setIsLoading(false));
    }

  }, [dispatch, navigate]);

  return (
    <section className={`${isLoading ?? 'min-h-[50vh]'} dashboard-wrapper mt-20`}>
      <div className="container">

        {
          userRole === 'service-provider' && 

            <ServicesProviderDashboard />
          
        }

        {
          userRole === 'customer' && 

            <CustomerDashboard />
          
        }

      </div>
    </section>
  )
}

export default DashboardLayout