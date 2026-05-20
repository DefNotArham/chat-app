import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFriendStore from "../../Stores/Friend.Store";
import useAuthStore from "../../Stores/Auth.Store";

const UserProfilePopup = ({ user, onClose }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { friends, addFriend } = useFriendStore();
  const { user: me } = useAuthStore();

  const isFriend = friends.some((f) => f._id === user._id);
  const isMe = me._id === user._id;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-50 left-[900px] -translate-x-1/2 -translate-y-1/2 z-[1000] w-56 bg-[#1e1f22] rounded-xl shadow-xl p-4 flex flex-col gap-3"
    >
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-discord-blurple flex items-center justify-center text-white text-2xl font-bold">
        {user.displayName?.[0]?.toUpperCase()}
      </div>

      {/* Info */}
      <div>
        <p className="text-white font-bold">{user.displayName}</p>
        <p className="text-discord-muted text-sm">{user.username}</p>
        <p className="text-discord-muted text-xs mt-0.5">
          {user.status ?? "Offline"}
        </p>
      </div>

      <div className="h-[1px] bg-gray-700" />

      {/* Action button */}
      {!isMe &&
        (isFriend ? (
          <button
            onClick={() => {
              navigate(`/dm/${user._id}`);
              onClose();
            }}
            className="w-full py-2 rounded-lg bg-discord-blurple hover:bg-discord-blurple-hover text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Message
          </button>
        ) : (
          <button
            onClick={() => addFriend(user.username)}
            className="w-full py-2 rounded-lg bg-discord-blurple hover:bg-discord-blurple-hover text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Add Friend
          </button>
        ))}
    </div>
  );
};

export default UserProfilePopup;
