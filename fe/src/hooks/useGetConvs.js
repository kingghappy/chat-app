import { useCallback } from "react";
import { toast } from "sonner";
import { useConvs } from "../store/zustand/auth.store";
import { BASE_SERVER } from "./../utils/config";

const useGetConvs = () => {
  const setConvs = useConvs((s) => s.setConvs);

  const getConvs = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_SERVER}/conv/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("error");
      const { users } = await res.json();
      setConvs(users);
    } catch (error) {
      toast.error(error.message);
      throw new Error("error", error.message);
    }
  }, [setConvs])
  return { getConvs };
};

export default useGetConvs;
