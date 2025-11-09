import { toast } from "sonner";
import { BASE_SERVER } from "../utils/config";

const useSendMessage = () => {
  const sendMessage = async (convid, content) => {
    try {
      const res = await fetch(`${BASE_SERVER}/message/send/${convid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("error");

    } catch (error) {
      toast.error(error.message);
      throw new Error("error", error.message);
    }
  };
  return { sendMessage };
};

export default useSendMessage;
