import { useState, useRef, useEffect } from "react";
import "./ChatContent.css";
import { useNavigate, useParams } from "react-router-dom";
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
    const messagesReference = ref(database, `/chats/${chatId}/messages/`);
    const messageViewRef = useRef(null);
    const navigate = useNavigate();

    if (chat === null)
        navigate('/Chat');

    const handleSendMessage = () => {
        if (message !== "") {
            push(messagesReference, { textContent: message, senderId: user.uid, timestamp: Date.now() });
            updateMRM({ textContent: message, senderId: user.uid, timestamp: Date.now(), read: false });
            setMessage("");
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Disable the default property, starting a new line in this case
            handleSendMessage();
        }
    }

    const scrollToBottom = () => {
        if (messageViewRef.current)
            messageViewRef.current.scrollTop = messageViewRef.current.scrollHeight;
    }

    useEffect(() => {
        const timer = setTimeout(
            scrollToBottom,
            100
        );
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!chat?.mrm.read && chat?.mrm.senderId !== user.uid)
            updateMRM({ read: true });
    }, [chat?.mrm]);

    useEffect(() => {
        if (chat?.mrm.senderId === user.uid)
            scrollToBottom();
    }, [chat?.messages]);

    return otherUser && chat &&
        <div className="chat-content">
            <div className="chat-content-header">
                <img src={otherUser.photoURL} />
                <h3>{otherUser.name}</h3>
            </div>
            <div className="message-view" ref={messageViewRef}>
                {Object.entries(chat.messages).sort((a, b) => a.timestamp - b.timestamp)
                    .map(([key, value]) => value.senderId === user.uid ?
                        <MessageRight textContent={value.textContent} key={key} /> :
                        <MessageLeft textContent={value.textContent} key={key} />)}
            </div>
            <div className="message-sender">
                <textarea className="message-input" placeholder="Type your message here..."
                    value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
}

export default ChatContent;