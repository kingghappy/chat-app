import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/AuthContext";
import { fetchJSON } from "../../utils/fetcher";

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const login = async (username, password) => {
    try {
      const { payload } = await fetchJSON("/auth/login", {
        method: "POST",
        json: { username, password },
      });
      toast.success("Login success, redirect ...");
      setAuth(payload);
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "error");
      throw err;
    }
  };

  return { login };
};

export default useLogin;
