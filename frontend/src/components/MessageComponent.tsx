import { IMessage } from "@/redux/features/chat/chat.types";
import { IUser } from "@/redux/features/users/users.types";
import { FC } from "react";
interface IProps{
    messages: IMessage[];
    currentUserId: IUser['_id'];
}

const MessageComponent: FC<IProps> = ({ messages, currentUserId }) => {
    return (
        <div style={{ padding: '20px' }}>
            {messages.map(message => {
                const isMyMessage = message.senderId === currentUserId;

                const isRead = message.readBy.length > 0;
                const isReadByReceiver = message.readBy.some(id => id !== message.senderId);

                const renderStatus = () => {
                    if (!isMyMessage) return null;

                    if (!isRead) return <span style={{ color: 'gray' }}>✔</span>;
                    if (isRead && !isReadByReceiver) return <span style={{ color: 'gray' }}>✔✔</span>;
                    if (isReadByReceiver) return <span style={{ color: '#0A84FF' }}>✔✔</span>;
                };

                return (
                    <div
                        key={message._id}
                        style={{
                            display: 'flex',
                            justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
                            marginBottom: '10px'
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '60%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                backgroundColor: isMyMessage ? '#DCF8C6' : '#F1F0F0',
                                textAlign: 'left'
                            }}
                        >
                            <p style={{ margin: 0 }}>{message.text}</p>

                            <div style={{ fontSize: '12px', marginTop: '5px', textAlign: 'right' }}>
                                {renderStatus()}
                                <span style={{ marginLeft: '5px' }}>
                                    {message.createdAt
                                        ? new Date(message.createdAt).toLocaleTimeString([], {
                                              hour: '2-digit',
                                              minute: '2-digit'
                                          })
                                        : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
            
        </div>
    );
};

export default MessageComponent;
