import { useDbData } from "../utilities/firebase";

let userDB = [];
let userFavs = [];
let nextAvailId = 0;

function generateEventsObject() {
  const [events] = useDbData("/events/");
  const eventsObject = {};


  if (events) {
    Object.entries(events).forEach(([key, event]) => {
      if (event && event.id !== undefined && (event.title !== undefined || event.desc !== undefined || event.location !== undefined || event.date !== undefined)) {
        // Directly use the key as the property in the eventsObject, storing the event details
        eventsObject[key] = {
          id: event.id,
          title: event.title ?? "", // Using nullish coalescing operator for simplicity
          desc: event.desc ?? "",
          location: event.location ?? "",
          date: event.date ?? "",
        };
      }

      nextAvailId = parseInt(key, 10) + 1;

    });
  }

  // Now, userDB will directly be an object with event IDs as keys and their details as values
  userDB = eventsObject;
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
  generateEventsObject();
  return [userDB, nextAvailId];
};

export { getEvents };
