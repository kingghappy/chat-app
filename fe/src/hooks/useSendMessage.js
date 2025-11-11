import { toast } from "sonner";
import { fetchJSON } from "../utils/fetcher";

const useSendMessage = () => {
  const sendMessage = async (convid, content) => {
    try {
      await fetchJSON(`/message/send/${convid}`, {
        method: "POST",
        json: { content },
      });
    } catch (err) {
      toast.error(err?.message || "error");
      throw err;
    }
  };
  return { sendMessage };
};

export default useSendMessage;
