import { useCallback } from "react";
import { toast } from "sonner";
import { useMessage } from "../store/zustand/auth.store";
import { fetchJSON } from "../utils/fetcher";

const useGetMessage = () => {
  const setMessages = useMessage((s) => s.setMessages);
  const setCurrMessage = useMessage((s) => s.setCurrMessage);
  const setRecipient = useMessage((s) => s.setRecipient);

  const getMessage = useCallback(async (username) => {
    try {
      const { messages, convId, recipient } = await fetchJSON(`/conv/${username}`);
      setMessages(messages);
      setCurrMessage(convId);
      setRecipient(recipient);
    } catch (err) {
      toast.error(err?.message || "error");
      throw err;
    }
  }, [setMessages, setCurrMessage, setRecipient]);

  return { getMessage };
};

export default useGetMessage;
