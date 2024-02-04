import React, { useEffect, useState } from 'react';
import { ref, update, onValue, remove } from "firebase/database";
import { database, useDbData } from "../utilities/firebase"
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import "./Chat.css";

const ChatItemOtherUserData = ({ latestMessage, otherUserId }) => {
    // We can provide other users data to the child component => ChatContent. 
    // There is no need to make 2 seperate calls to the same location 
    // in a parent, child component structure

    const [otherUserData, otherUserDataError] = useDbData(`/users/${otherUserId}`);
    return (otherUserData && <>
        <div className="chat-avatar">
            <img src={otherUserData.photoURL} />
        </div>
        <div className="chat-details">
            <div className="chat-partner-name">{otherUserData.name}</div>
            <div className="chat-latest-message">{latestMessage}</div>
        </div>
    </>)
}

// Function to update data at a specific path
const updateData = (path, data) => {
    update(ref(database, path), data)
        .then(() => {
            console.log('Data updated successfully');
        })
        .catch((error) => {
            console.error('Failed to update data', error);
        });
};

const deleteChat = async (userId, otherUserId, chatId) => {
    console.log(userId, otherUserId, chatId);
    await remove(ref(database, `/users/${userId}/chat/${otherUserId}`));
    await remove(ref(database, `/users/${otherUserId}/chat/${userId}`));
    await remove(ref(database, `/chats/${chatId}`));
}

const Chat = ({ user }) => {
    const navigate = useNavigate();
    const [chats, chatsError] = useDbData(`/users/${user.uid}/chat`);
    const [chatData, setChatData] = useState({});
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    console.log('chats', chats);

    useEffect(() => {
        const unsubscribes = []; // Store unsubscribe functions

        if (chats) {
            Object.entries(chats).forEach(([otherUserId, chatId]) => {
                const chatRef = ref(database, `/chats/${chatId}/mrm`);

                const unsubscribe = onValue(chatRef, snapshot => {
                    setChatData(prevChatData => ({
                        ...prevChatData,
                        [chatId]: { otherUserId: otherUserId, ...snapshot.val() }
                    }));
                });

                unsubscribes.push(unsubscribe);
            });
        }

        // Clean up the listener when the component unmounts or chats changes
        return () => {
            unsubscribes.forEach(unsubscribe => unsubscribe());
        };
    }, [chats]); // Ensure chats is correctly tracked for changes

    const handleChatClick = (chatId, senderId) => {
        if (senderId !== user.uid) {
            updateData(`/chats/${chatId}/mrm/`, { read: true });
        }
        navigate(`/Chat/${chatId}`);
    };

    const handleCloseChat = (event, chatId, otherUserId) => {
        event.stopPropagation();
        deleteChat(user.uid, otherUserId, chatId);
        console.log('called close chat');
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Your Chats</h2>
            <div className="chat-list">
                {Object.entries(chatData).sort((a, b) => b[1].timestamp - a[1].timestamp).map(([chatId, data]) => (
                    <div
                        key={chatId}
                        className={(!data.read && user.uid !== data.senderId) ? "chat-conversation unread" : "chat-conversation"}
                        onClick={() => handleChatClick(chatId, data.senderId)}
                        role="button"
                        tabIndex={0}
                    >
                        <ChatItemOtherUserData latestMessage={data.textContent} otherUserId={data.otherUserId} />
                        <CloseButton className='close-button' onClick={(e) => handleCloseChat(e, chatId, data.otherUserId)} />
                    </div>))}
            </div>
        </div>
    );
};

export default Chat;


