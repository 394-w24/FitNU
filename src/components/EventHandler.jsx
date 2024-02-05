import { useDbData } from "../utilities/firebase";

let userDB = [];
let userFavs = [];

function generateArrayOfDicts() {
  // my_id = "0"; //this is for testing purposes
  const [events] = useDbData("/events/");
  const keyValPairsArr = events && Object.entries(events);
  console.log(keyValPairsArr);

  if (keyValPairsArr) {
    const arrayOfDicts = keyValPairsArr
      .filter(([key, event]) => event && (
        event.title !== undefined ||
        event.desc !== undefined ||
        event.location !== undefined ||
        event.date !== undefined
      ))
      .map(([key, event]) => ({
        id: key,
        title: event?.title === undefined ? "" : event.title.toString(),
        desc: event?.desc === undefined ? "" : event.desc.toString(),
        location: event?.location === undefined ? "" : event.location.toString(),
        date: event?.date === undefined ? "" : event.date.toString(),
      }));

    // Print or use the generated array of dictionaries
    userDB = arrayOfDicts;
  }

}

function generateArrayOfFavorites() {
  // my_id = "0"; //this is for testing purposes
  const [events] = useDbData("/favorites/");
  const keyValPairsArr = events && Object.entries(events);
  console.log(keyValPairsArr);

  // Print or use the generated array of dictionaries
  userDB = arrayOfDicts;

}

const getEvents = () => {
  generateArrayOfDicts();
  return userDB;
};

export { getEvents };
