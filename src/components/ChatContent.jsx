import { useState } from "react";
import "./ChatContent.css";
import { useParams } from "react-router-dom";
import { database, useDbData, useDbUpdate } from "../utilities/firebase";
import { push, ref } from "firebase/database";

const MessageRight = ({ textContent }) => {
    return <div className="message-right">{textContent}</div>
}

const MessageLeft = ({ textContent }) => {
    return <div className="message-left">{textContent}</div>
}

// If we were to allow multiple users, then should update this function
const getOtherUser = (chat, currUserUID) => {
    if (chat) {
        return Object.entries(chat.users).find(user => user[0] !== currUserUID)[0];
    } else {
        return null;
    }
}

const ChatContent = ({ user }) => {
    const [message, setMessage] = useState("");
    const { chatId } = useParams();
    const [updateMRM, updateMRMResult] = useDbUpdate(`/chats/${chatId}/mrm/`);
    const [chat, chatError] = useDbData(`/chats/${chatId}/`);
    const [otherUser, otherUserError] = useDbData(`/users/${getOtherUser(chat, user.uid)}/`);
    const messagesReference = ref(database, `/chats/${chatId}/messages/`)

    // if (chat)
    //     console.log(Object.entries(chat.messages).sort((a, b) => a.timestamp - b.timestamp));

    const handleSendMessage = (event) => {
        console.log(message);
        push(messagesReference, { textContent: message, senderId: user.uid, timestamp: Date.now() });
        setMessage("");
    }

    return otherUser &&
        <div className="chat-content">
            <div className="chat-content-header">
                <img src={otherUser.photoURL} />
                <h3>{otherUser.name}</h3>
            </div>
            <div className="message-view">
                {Object.entries(chat.messages).sort((a, b) => a.timestamp - b.timestamp).map(([key, value]) => value.senderId === user.uid ?
                    <MessageRight textContent={value.textContent} key={key} /> :
                    <MessageLeft textContent={value.textContent} key={key} />)}
            </div>
            <div className="message-sender">
                <textarea className="message-input" placeholder="Type your message here..."
                    value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
}

export default ChatContent;