import DATAFILE from '../data/dummyData.json';
import useProfileStore from '../utilities/store';
import { useDbData, useDbUpdate } from "../utilities/firebase";


let my_id = "0";
let me = {};
let userDB = [];
let matchablesDict = {};
let matchables = [];
let seenProfiles = [];

function setUID(id) {
    my_id = id;
    // console.log(my_id)
}

// quick fix
// nextProfile();

function generateArrayOfDicts() {
    // my_id = "0"; //this is for testing purposes
    const [users] = useDbData('/users/')
    const keyValPairsArr = users && Object.entries(users)
    // console.log(keyValPairsArr)

    if (keyValPairsArr) {
        const arrayOfDicts = keyValPairsArr.map(([key, user]) => {
            return {
                id: key,
                name: user?.name === undefined ? 'Null' : user.name.toString(),
                gender: user?.gender === undefined ? 'Null' : user.gender.toString(),
                days: user?.days === undefined ? [] : user.days,
                location: user?.location === undefined ? -1 : user.location,
                expertise: user?.expertise === undefined ? -1 : user.expertise,
                sport: user?.sport === undefined ? 'Null' : user.sport,
                funFact: user?.funFact === undefined ? 'Null' : user.funFact
            };
        });

        // Print or use the generated array of dictionaries
        userDB = arrayOfDicts;
    }
}


function findUsersBySport(userData, sport) {
    return userData.filter(user => user.sport === sport);
};

function calculateMatchingAll(origin) {
    // TODO: calculate a matching score for the various users. For now we are just finding all same-sport users


    generateArrayOfDicts()
    // console.log(userDB)
    if (userDB) {
        me = userDB.find(user => user.id.toString() == my_id.toString());
        let usersWithSameSport = me ? findUsersBySport(userDB, me.sport) : [];
        usersWithSameSport.forEach(user => {
            matchablesDict[user.id] = user.id.toString();
        });

        matchables = Object.keys(matchablesDict).sort((a, b) => matchablesDict[b] - matchablesDict[a]);

        matchables = matchables.filter(value => value !== my_id.toString());
        console.log(matchables)
        return 0
    }
    return 1
    // console.log(matchables[0])
};


function showCard(id) {
    // Fetch user data based on the provided ID
    const user = userDB.find((user) => user.id == id);

    console.log("showcard", user)

    if (user) {
        // Update the user profile in the zustand store
        useProfileStore.setState({ profile: user });
    } else {
        console.error('User not found with ID:', id);
    }

}


function showEmpty() {
    // TODO: handle showing profile card and reaching the end of valid options

    // the following is a temp solution more will need to be done!!!


    // alert("You've reached the end of the personalized feed! \nThe feed will now start back from the top.")

    seenProfiles = [];
    nextProfile();

}


function getUser() {
    return seenProfiles[-1];
}


function getUserName() {

    let target = (userDB.find(user => user.id == (seenProfiles[seenProfiles.length - 1])))

    if (target === undefined) {

    } else {
        console.log(target.name)

        return target.name
    }



}



function nextProfile() {

    // let uid = matchables.shift()
    let uid = matchables.find(id => !seenProfiles.includes(id));

    console.log(uid)
    if (uid === undefined) {
        showEmpty()
    } else {

        seenProfiles.push(uid);
        showCard(uid);
    }

};



export { setUID, calculateMatchingAll, getUserName, nextProfile };