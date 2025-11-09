import { toast } from "sonner";

import { BASE_SERVER } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/AuthContext";

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
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
      toast.success("Login success, redirect ...");
      setAuth(payload);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      throw new Error("error", error.message);
    }
  };

  return { login };
};

export default useLogin;
