import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config/server";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // ✅ If user already exists, DO NOT refetch
    if (userData) return;

    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/getCurrentUser`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch, userData]);
};

export default useGetCurrentUser;
