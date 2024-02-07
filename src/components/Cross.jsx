// import "./Check.css";
// import { calculateMatchingAll, nextProfile } from "./ProfileHandler";


// const Cross = () => {
//   calculateMatchingAll('cross')
//   return (
//     <div className="matchButton">
//       <button onClick={handleRejectClick} className="reject-button">
//         <img src="/xmark.png" alt="X Mark" className="icon" />
//       </button>
//     </div>
//   );
// };

// function handleRejectClick() {
//   alert("You rejected this match!");

//   nextProfile();
// };


// export default Cross;


import React from 'react';
import { getDatabase, ref, set, push, get } from "firebase/database";
import useProfileStore from '../utilities/store';
import { getUID, getUserName, nextProfile } from "./ProfileHandler";

const Cross = ({ user }) => {
  const { profile } = useProfileStore();
  const myUid = user && user.uid;
  const yourUid = profile.id;
  const myName = user && user.displayName;
  const yourName = profile.name;

  const handleRejectClick = () => {
    const db = getDatabase();
    const chatsRef = ref(db, 'chats');

    // Check if there's already a chat between the two users
    const userChatRef = ref(db, `users/${myUid}/chat/${yourUid}`);
    console.log("this is userChatRef:", userChatRef)
    get(userChatRef).then((snapshot) => {
      if (snapshot.exists()) {
        alert("It seems you already have a connection with " + yourName + "! Check your chat!");
        // console.log(snapshot)
      } else {
        // Chat does not exist, create a new chat
        const newChatRef = push(chatsRef);
        const chatID = newChatRef.key;

        // Timestamp for the initial message and chat creation
        const timestamp = Date.now();

        // Initialize chat data structure
        const initialChatData = {
          mrm: {
            textContent: "This user has declined to match with you",
            timestamp: timestamp,
            senderId: myUid,
            read: false
          },
          users: {
            [myUid]: myName,
            [yourUid]: yourName
          }
        };

        // Set chat data at the newly created chatID
        set(newChatRef, initialChatData);

        // Initialize the first message in the Messages subcollection
        const firstMessage = {
          textContent: "This user has declined to match with you",
          timestamp: timestamp,
          senderId: myUid,
        };

        // Set the initial message in the chat's message subcollection
        const messagesRef = ref(db, `chats/${chatID}/messages`);
        const newMessageRef = push(messagesRef);
        set(newMessageRef, firstMessage);

        // Set chat reference for both users
        set(ref(db, `users/${myUid}/chat/${yourUid}`), chatID);
        set(ref(db, `users/${yourUid}/chat/${myUid}`), chatID);
      }
    }).catch((error) => {
      console.error(error);
    });

    nextProfile();
  };

  return (
    <div className="matchButton">
      <button onClick={handleRejectClick} className="reject-button">
        <img src="/xmark.png" alt="X Mark" className="icon" />
      </button>
    </div>
  );
};

export default Cross;


