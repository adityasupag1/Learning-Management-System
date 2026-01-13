import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  useGetCurrentUser(); // ✅ correct usage
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!userData ? <Signup /> : <Navigate to={"/"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path="/forgotpassword" element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />} />
      </Routes>
    </>
  );
}

export default App;
