// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get } from "firebase/database";
// import "./Chat.css"; // Make sure the CSS file is linked properly
// import { useNavigate } from 'react-router-dom';

// const Chat = ({ user }) => {
//     const navigate = useNavigate();
//     const [chats, setChats] = useState([]);
//     const myUid = user.uid;

//     useEffect(() => {
//         const db = getDatabase();
//         const userChatsRef = ref(db, `users/${myUid}/chat`);

//         get(userChatsRef).then(snapshot => {
//             if (snapshot.exists()) {
//                 const chatIds = snapshot.val();
//                 const chatInfoPromises = Object.entries(chatIds).map(([otherUserId, chatId]) =>
//                     get(ref(db, `chats/${chatId}`)).then(chatSnapshot => {
//                         if (chatSnapshot.exists()) {
//                             const chatData = chatSnapshot.val();
//                             return {
//                                 otherUserId,
//                                 otherUserName: chatData.users[otherUserId], // Adjust based on your data structure
//                                 latestMessage: chatData.mrm.textContent,
//                                 chatId
//                             };
//                         }
//                         return null;
//                     })
//                 );

//                 Promise.all(chatInfoPromises).then(chatsInfo => {
//                     setChats(chatsInfo.filter(chatInfo => chatInfo !== null));
//                 });
//             }
//         });
//     }, [myUid]);

//     const handleChatClick = (chatId) => {
//         // Navigation or other click handling logic goes here
//         //console.log('chatId', chatId);
//         navigate(`/Chat/${chatId}`);
//     };

//     return (
//         <div className="chat-container">
//             <h2 className="chat-title">Your Chats</h2>
//             <div className="chat-list">
//                 {chats.map(({ chatId, otherUserName, latestMessage }) => (
//                     <div
//                         key={chatId}
//                         className="chat-conversation"
//                         onClick={() => handleChatClick(chatId)}
//                         role="button"
//                         tabIndex={0} // Allows keyboard navigation
//                     >
//                         <div className="chat-avatar">
//                             {/* Replace with avatar image if available */}
//                         </div>
//                         <div className="chat-details">
//                             <div className="chat-partner-name">{otherUserName}</div>
//                             <div className="chat-latest-message">{latestMessage}</div>
//                         </div>
//                         {/* Timestamp can be added here if needed */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useDbData } from '../utilities/firebase';

// Function to update data at a specific path
const updateData = (path, data) => {
    const db = getDatabase();
    const dataRef = ref(db, path);

    update(dataRef, data)
        .then(() => {
            console.log('Data updated successfully');
        })
        .catch((error) => {
            console.error('Failed to update data', error);
        });
};

const Chat = ({ user }) => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const myUid = user.uid;

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
                                senderId: chatData.mrm.senderId,
                                otherUserName: chatData.users[otherUserId], // Adjust based on your data structure
                                latestMessage: chatData.mrm.textContent,
                                timestamp: chatData.mrm.timestamp, // Store the timestamp of the latest message
                                chatId,
                                read: chatData.mrm.read
                            };
                        }
                        return null;
                    })
                );

                Promise.all(chatInfoPromises).then(chatsInfo => {
                    // Sort chats by the timestamp of the latest message
                    const sortedChats = chatsInfo
                        .filter(chatInfo => chatInfo !== null)
                        .sort((a, b) => b.timestamp - a.timestamp); // Sort in descending order

                    setChats(sortedChats);
                });
            }
        });
    }, [myUid]);

    const handleChatClick = (chatId, senderId) => {
        if (senderId !== user.uid) {
            updateData(`/chats/${chatId}/mrm/`, { read: true });
        }
        navigate(`/Chat/${chatId}`);
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Your Chats</h2>
            <div className="chat-list">
                {chats.map(({ chatId, otherUserName, latestMessage, read, senderId }) => (
                    <div
                        key={chatId}
                        className={!read && user.uid !== senderId ? "chat-conversation unread" : "chat-conversation"}
                        onClick={() => handleChatClick(chatId, senderId)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="chat-avatar"></div>
                        <div className="chat-details">
                            <div className="chat-partner-name">{otherUserName}</div>
                            <div className="chat-latest-message">{latestMessage}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
