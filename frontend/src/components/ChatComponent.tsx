import { IChat } from "@/redux/features/chat/chat.types";
import { IPlace } from "@/redux/features/places/places.types";
import { IUser } from "@/redux/features/users/users.types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
    chats: IChat[];
    user?: IUser;
    places: IPlace[];
}

const ChatComponent: FC<IProps> = ({ chats, user, places }) => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "20px" }}>
            {chats.map(chat => {
                const place = places.find(p => p._id === chat.placeId);

                const isManager = user?.role === "manager";

                return (
                    <div
                        key={chat._id}
                        onClick={() => navigate(`/chats/${chat._id}/messages`)}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "12px",
                            marginBottom: "12px",
                            cursor: "pointer",
                            backgroundColor: isManager ? "#F7F9FF" : "#FFF8F2"
                        }}
                    >
                        <h3 style={{ margin: 0 }}>
                            {isManager
                                ? `User: ${chat.userId}`
                                : `Place: ${place?.name ?? "Unknown place"}`}
                        </h3>

                        {chat.lastMessage && (
                            <p style={{ margin: "6px 0" }}>
                                <strong>Last:</strong> {chat.lastMessage}
                            </p>
                        )}

                        {chat.lastMessageTime && (
                            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
                                {new Date(chat.lastMessageTime).toLocaleString()}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatComponent;
