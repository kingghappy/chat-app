import { toast } from "sonner";

import { BASE_SERVER } from "../../utils/config";
import { useAuth } from "../../store/context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const login = async (username, password) => {
    try {
      const res = await fetch(`${BASE_SERVER}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // *Bắt buộc: Báo cho server biết ta gửi JSON
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("error");

      const { payload } = await res.json();
      setAuth(payload);
      toast.success("Login success, redirect ...");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      throw new Error("error", error.message);
    }
  };

  return { login };
};

export default useLogin;
