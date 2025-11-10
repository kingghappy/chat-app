import { useEffect } from "react";
// Import các icon (bạn có thể để ở đầu file)
import {
  IoNotificationsOffOutline,
  IoVolumeMuteOutline,
  IoPinOutline,
  IoTrashOutline,
  IoArchiveOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import Conversation from "./Conversation";
import { useConvs } from "../../../store/zustand/auth.store";
import useGetConvs from "./../../../hooks/useGetConvs";
import { useSocket } from "../../../store/context/SocketContext";

const Conversations = () => {
  const convs = useConvs((s) => s.convs);
  const { getConvs } = useGetConvs();
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      await getConvs();
    };
    fetchData();
  }, [getConvs]);

  const actions = [
    <IoNotificationsOffOutline size={18} className="text-gray-400" />,
    <IoVolumeMuteOutline size={18} className="text-gray-400" />,
    <IoPinOutline size={18} className="text-gray-400" />,
    <IoTrashOutline size={18} className="text-red-500" />,
    <IoArchiveOutline size={18} className="text-gray-400" />,
    <IoPersonAddOutline size={18} className="text-gray-400" />,
  ];

  return (
    <div className="flex flex-col space-y-2">
      {convs.map((convo, index) => {
        const isOnline = onlineUsers.includes(convo._id);

        return (
          <Conversation
            key={convo._id}
            conv={convo}
            isOnline={isOnline}
            notificationCount={convo.notification}
            
            actionIcon={actions[index % actions.length]}
          />
        );
      })}
    </div>
  );
};

export default Conversations;
