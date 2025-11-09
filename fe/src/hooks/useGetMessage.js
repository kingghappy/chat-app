import { useCallback } from "react";
import { toast } from "sonner";
import { useMessage } from "../store/zustand/auth.store";
import { BASE_SERVER } from "../utils/config";

const useGetMessage = () => {
  const setMessages = useMessage((s) => s.setMessages);
  const setCurrMessage = useMessage((s) => s.setCurrMessage);
  const setRecipient = useMessage((s) => s.setRecipient);

  const getMessage = useCallback(
    async (username) => {
      try {
        const res = await fetch(`${BASE_SERVER}/conv/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("error");
        const { messages, convId, recipient } = await res.json();

        setMessages(messages);
        setCurrMessage(convId);
        setRecipient(recipient);
      } catch (error) {
        toast.error(error.message);
        throw new Error("error", error.message);
      }
    },
    [setMessages, setCurrMessage, setRecipient]
  );
  return { getMessage };
};

export default useGetMessage;
