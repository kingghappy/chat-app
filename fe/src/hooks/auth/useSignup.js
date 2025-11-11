import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/AuthContext";
import { fetchJSON } from "../../utils/fetcher";

const useSignup = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      const data = await fetchJSON("/auth/signup", {
        method: "POST",
        json: formData,
      });
      setAuth(data.user);
      toast.success("Login success, redirect ...");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "error");
      throw err;
    }
  };

  return { signup };
};

export default useSignup;
