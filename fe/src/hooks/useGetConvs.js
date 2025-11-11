import { useCallback } from "react";
import { toast } from "sonner";
import { useConvs } from "../store/zustand/auth.store";
import { fetchJSON } from "../utils/fetcher";

const useGetConvs = () => {
  const setConvs = useConvs((s) => s.setConvs);

  const getConvs = useCallback(async () => {
    try {
      const { users } = await fetchJSON("/conv/all");
      setConvs(users);
    } catch (err) {
      toast.error(err?.message || "error");
      throw err;
    }
  }, [setConvs]);

  return { getConvs };
};

export default useGetConvs;
