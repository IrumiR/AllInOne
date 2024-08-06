import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/store/loading.slice";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { setIsUserAuthenticated } from "@/store/auth.slice";
import { getCurrentUser } from "@/services/auth.service";
import { setUser } from "@/store/user.slice";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      dispatch(setIsLoading(true));

      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

      if (!accessToken || !userId) {
        navigate("/login");
      } else {
        dispatch(setIsUserAuthenticated(true));

        try {

          const response = await getCurrentUser(userId);
          const currentUser = response.data;
          dispatch(setUser(currentUser));

        } catch (error) {
          console.error("Failed to fetch user data", error);
          navigate("/login"); // Navigate to login if fetching user fails
        }
      }

      dispatch(setIsLoading(false));
    };

    loadUserData();
  }, [dispatch, navigate]);

  return (
    <section className="mt-20">
      <div className="container py-10">
        her we go
      </div>
    </section>
  );
}

export default ProfilePage;
