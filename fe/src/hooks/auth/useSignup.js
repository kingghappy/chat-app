import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { BASE_SERVER } from "../../utils/config";
import { useAuth } from "./../../store/context/AuthContext";

const useSignup = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const singnup = async (formData) => {
    try {
      const res = await fetch(`${BASE_SERVER}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // *Bắt buộc: Báo cho server biết ta gửi JSON
        },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) throw new Error("error");

      const data = await res.json();
      setAuth(data.user);
      toast.success("Login success, redirect ...");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      throw new Error("error", error.message);
    }
  };

  return {
    singnup,
  };
};

export default useSignup;
