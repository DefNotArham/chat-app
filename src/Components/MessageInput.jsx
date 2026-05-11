import { IoSend } from "react-icons/io5";
import useChannelStore from "../Stores/Channel.Store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const MessageInput = () => {
  const { currentChannel, loadChannel } = useChannelStore();
  const { serverId, channelId } = useParams();

  useEffect(() => {
    if (serverId && channelId) {
      loadChannel(serverId, channelId);
    }
  }, [serverId, channelId, loadChannel]);

  return (
    <div className="px-4 pb-4">
      {/* Input bar */}
      <div className="flex items-center gap-2 bg-discord-input rounded-lg px-3 py-2">
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-discord-placeholder outline-none text-sm"
          placeholder={`Message #${currentChannel?.name || "general"}`}
        />

        {/* Send button */}
        <button className="p-1.5 rounded transition-colors cursor-pointer text-discord-blurple hover:bg-discord-blurple/20">
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
