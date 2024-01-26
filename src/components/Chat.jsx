
// // const Chat = () => {
// //   return <div className="chat">This is the chat component</div>;
// // };

// // export default Chat;

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { getUID } from "./ProfileHandler"; // Import getUID from your actual ProfileHandler
import "./Chat.css"; // Make sure the CSS file is linked properly

const Chat = () => {
    const [chats, setChats] = useState([]);
    const myUid = getUID(); // Retrieve the current user's UID

    useEffect(() => {
        const db = getDatabase();
        const userChatsRef = ref(db, `users/${myUid}/chat`);

        get(userChatsRef).then(snapshot => {
            if (snapshot.exists()) {
                const chatIds = snapshot.val();
                const chatInfoPromises = Object.entries(chatIds).map(([otherUserId, chatId]) =>
                    get(ref(db, `chats/${chatId}`)).then(chatSnapshot => {
                        if (chatSnapshot.exists()) {
                            const chatData = chatSnapshot.val();
                            return {
                                otherUserId,
                                otherUserName: chatData.users[otherUserId], // Adjust based on your data structure
                                latestMessage: chatData.mrm.textContent,
                                chatId
                            };
                        }
                        return null;
                    })
                );

                Promise.all(chatInfoPromises).then(chatsInfo => {
                    setChats(chatsInfo.filter(chatInfo => chatInfo !== null));
                });
            }
        });
    }, [myUid]);

    const handleChatClick = (chatId) => {
        // Navigation or other click handling logic goes here
        console.log(`Chat with ID ${chatId} was clicked.`);
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Your Chats</h2>
            <div className="chat-list">
                {chats.map(({ chatId, otherUserName, latestMessage }) => (
                    <div
                        key={chatId}
                        className="chat-conversation"
                        onClick={() => handleChatClick(chatId)}
                        role="button"
                        tabIndex={0} // Allows keyboard navigation
                    >
                        <div className="chat-avatar">
                            {/* Replace with avatar image if available */}
                        </div>
                        <div className="chat-details">
                            <div className="chat-partner-name">{otherUserName}</div>
                            <div className="chat-latest-message">{latestMessage}</div>
                        </div>
                        {/* Timestamp can be added here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
