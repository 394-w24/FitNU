// getDatabase gets a reference to the database, 
// ref creates a reference to a specific path in the database, 
// set sets the data at a certain path, push adds data to a list and automatically generates a key, 
// get retrieves data at a certain path.

import React from 'react';
import "./Check.css";
import useProfileStore from '../utilities/store';
import { getUID, getUserName, nextProfile, saveLast } from "./ProfileHandler";
import { getDatabase, ref, set, push, get } from "firebase/database";

const Check = ({ user }) => {
    const { profile } = useProfileStore();
    const myUid = user && user.uid;
    const yourUid = profile.id;
    const myName = user && user.displayName;
    const yourName = profile.name;

    function handleMatchClick() {
        const db = getDatabase();
        const chatsRef = ref(db, 'chats');

        // Check if there's already a chat between the two users
        const userChatRef = ref(db, `users/${myUid}/chat/${yourUid}`);
        get(userChatRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Chat already exists");
                alert("It seems you already have a connection with " + yourName + "! Check your chat!");            } else {
                // Chat does not exist, create a new chat
                const newChatRef = push(chatsRef);
                const chatID = newChatRef.key;

                // Timestamp for the initial message and chat creation
                const timestamp = Date.now();

                console.log('clicked the checkmark', profile);

                // Initialize chat data structure
                const initialChatData = {
                    mrm: {
                        textContent: "I would like to work out with you",
                        timestamp: timestamp,
                        senderId: myUid,
                        read: false
                    },
                    users: {
                        [myUid]: myName,
                        [yourUid]: profile.name
                    }
                };

                // Set chat data at the newly created chatID
                set(newChatRef, initialChatData);

                // Initialize the first message in the Messages subcollection
                const firstMessage = {
                    textContent: "I would like to work out with you",
                    timestamp: timestamp,
                    senderId: myUid,
                };

                // Correctly reference the messages subcollection and add the first message
                const messagesRef = ref(db, `chats/${chatID}/messages`);
                const newMessageRef = push(messagesRef);
                set(newMessageRef, firstMessage);

                // Set chat reference for both users
                set(ref(db, `users/${myUid}/chat/${yourUid}`), chatID);
                set(ref(db, `users/${yourUid}/chat/${myUid}`), chatID);
                alert("You sent a message to " + yourName + "!");

            }
        }).catch((error) => {
            console.error(error);
        });

        // Existing functionality
        saveLast();
        nextProfile();
    }

    return (
        <div className="matchButton">
            <button onClick={handleMatchClick} className="match-button">
                <img src="/checkmark.png" alt="Checkmark" className="icon" />
            </button>
        </div>
    );
};

export default Check;
