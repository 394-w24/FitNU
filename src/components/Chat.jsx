import { useDbData, useDbUpdate } from "../utilities/firebase";

const ChatRow = (user) => {
  <div>
    <h1></h1>
    <div className="user-name">
      <h1>Jason</h1>
    </div>
  </div>
}

const Chat = (user) => {
  arrayChatIds = useDbData(`/users/${user.uid}/chats`);

  // query chats/chatId == arrayChatIds[i]
  chats = useDbData(`/chats/${arrayChatIds[0]}/`);

  useDbUpdate(`/chats/${arrayChatIds[0]}/`);

  return <div className="chat">
    arrayOfChats.map(user => <ChatRow />);
  </div>;
};

export default Chat;
