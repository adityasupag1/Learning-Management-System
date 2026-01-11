import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config/server";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";

const useGetCurrentUser = () => {
  console.log("useGetCurrentUser hook running");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching current user...");

        const result = await axios.get(
          `${serverUrl}/api/user/getCurrentUser`,
          { withCredentials: true }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };

    fetchUser(); // 🔴 THIS WAS MISSING
  }, [dispatch]);
};

export default useGetCurrentUser;
