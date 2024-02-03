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

// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get, update } from "firebase/database";
// import "./Chat.css";
// import { useNavigate } from 'react-router-dom';

// // Function to update data at a specific path
// const updateData = (path, data) => {
//     const db = getDatabase();
//     const dataRef = ref(db, path);

//     update(dataRef, data)
//         .then(() => {
//             console.log('Data updated successfully');
//         })
//         .catch((error) => {
//             console.error('Failed to update data', error);
//         });
// };

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
//                                 senderId: chatData.mrm.senderId,
//                                 otherUserName: chatData.users[otherUserId], // Adjust based on your data structure
//                                 latestMessage: chatData.mrm.textContent,
//                                 timestamp: chatData.mrm.timestamp, // Store the timestamp of the latest message
//                                 chatId,
//                                 read: chatData.mrm.read
//                             };
//                         }
//                         return null;
//                     })
//                 );

//                 /* We can add a similar query here to pull the data about each user 
//                     and dislay their name profile image etc. */

//                 Promise.all(chatInfoPromises).then(chatsInfo => {
//                     // Sort chats by the timestamp of the latest message
//                     const sortedChats = chatsInfo
//                         .filter(chatInfo => chatInfo !== null)
//                         .sort((a, b) => b.timestamp - a.timestamp); // Sort in descending order

//                     setChats(sortedChats);
//                 });
//             }
//         });
//     }, [myUid]);

//     const handleChatClick = (chatId, senderId) => {
//         if (senderId !== user.uid) {
//             updateData(`/chats/${chatId}/mrm/`, { read: true });
//         }
//         navigate(`/Chat/${chatId}`);
//     };

//     // console.log("render count", new Date(Date.now()).toLocaleString());

//     return (
//         <div className="chat-container">
//             <h2 className="chat-title">Your Chats</h2>
//             <div className="chat-list">
//                 {chats.map(({ chatId, otherUserName, latestMessage, read, senderId }) => (
//                     <div
//                         key={chatId}
//                         className={!read && user.uid !== senderId ? "chat-conversation unread" : "chat-conversation"}
//                         onClick={() => handleChatClick(chatId, senderId)}
//                         role="button"
//                         tabIndex={0}
//                     >
//                         <div className="chat-avatar"></div>
//                         <div className="chat-details">
//                             <div className="chat-partner-name">{otherUserName}</div>
//                             <div className="chat-latest-message">{latestMessage}</div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { ref, update, onValue } from "firebase/database";
import { database, useDbData } from "../utilities/firebase"
import { useNavigate } from 'react-router-dom';
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

const Chat = ({ user }) => {
    const navigate = useNavigate();
    const [chats, chatsError] = useDbData(`/users/${user.uid}/chat`);
    const [chatData, setChatData] = useState({});

    useEffect(() => {
        if (chats) {
            Object.entries(chats).forEach(([otherUserId, chatId]) => {
                const chatRef = ref(database, `/chats/${chatId}/mrm`);

                const unsubscribe = onValue(chatRef, snapshot => {
                    setChatData(prevChatData => ({
                        ...prevChatData,
                        [chatId]: { otherUserId: otherUserId, ...snapshot.val() }
                    }));
                });

                // Clean up the listener when the component unmounts or chats changes
                return () => {
                    unsubscribe();
                };
            });
        }
    }, [chats]);

    const handleChatClick = (chatId, senderId) => {
        if (senderId !== user.uid) {
            updateData(`/chats/${chatId}/mrm/`, { read: true });
        }
        navigate(`/Chat/${chatId}`);
    };

    // console.log('counting renders', new Date(Date.now()).toLocaleTimeString());

    return (
        <div className="chat-container">
            <h2 className="chat-title">Your Chats</h2>
            <div className="chat-list">
                {Object.entries(chatData).sort((a, b) => b[1].timestamp - a[1].timestamp).map(([chatId, mrm]) => (
                    <div
                        key={chatId}
                        className={(!mrm.read && user.uid !== mrm.senderId) ? "chat-conversation unread" : "chat-conversation"}
                        onClick={() => handleChatClick(chatId, mrm.senderId)}
                        role="button"
                        tabIndex={0}
                    >
                        <ChatItemOtherUserData latestMessage={mrm.textContent} otherUserId={mrm.otherUserId} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
