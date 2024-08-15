import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '@/store/loading.slice';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';
import { setIsUserAuthenticated, login } from '@/store/auth.slice';
import { getCurrentUser } from '@/services/auth.service';
import { setUser } from '@/store/user.slice';

// components
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserAuthenticated = useSelector((state) => state.auth.isUserAuthenticated);

  console.log('isUserAuthenticated', isUserAuthenticated);

  useEffect(() => {
    const loadUserData = async () => {
      dispatch(setIsLoading(true));

      try {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
        const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);

        if (!accessToken && !userId && !userRole) {
          navigate("/login");
        } else {
          dispatch(setIsUserAuthenticated(true));
          // dispatch(login());

          const response = await getCurrentUser(userId);
          const currentUser = response?.data;

          if (currentUser) {
            dispatch(setUser(currentUser));
          } else {
            navigate("/login"); // Navigate to login if the user data is invalid
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        navigate("/login"); // Navigate to login if an error occurs
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    loadUserData();
  }, [dispatch, navigate]);

  return (
    <div>
      <DashboardLayout />
    </div>
  );
}

export default DashboardPage;
