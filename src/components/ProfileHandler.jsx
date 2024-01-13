import DATAFILE from '../data/dummyData.json';
import useProfileStore from '../utilities/store';
import { useDbData } from "../utilities/firebase";


let my_id = 0;
let me = {};
let userDB = [];
let matchablesDict = {};
let matchables = [];
let seenProfiles = [];

// quick fix
nextProfile();

nextProfile();

function generateArrayOfDicts() {
    // console.log(DATAFILE)

    if (DATAFILE) {
        const arrayOfDicts = DATAFILE.users.map(user => {
            return {
                id: user.id,
                name: user.name,
                gender: user.gender,
                days: user.days,
                location: user.location,
                expertise: user.expertise,
                sport: user.sport,
                funFact: user.funFact
            };
        });

        // Print or use the generated array of dictionaries
        return (arrayOfDicts);
    }
}


function findUsersBySport(userData, sport) {
    return userData.filter(user => user.sport === sport);
};

function calculateMatchingAll() {
    // TODO: calculate a matching score for the various users. For now we are just finding all same-sport users


    userDB = generateArrayOfDicts()
    // console.log(userDB)
    me = userDB.find(user => user.id == my_id);
    let usersWithSameSport = me ? findUsersBySport(userDB, me.sport) : [];
    usersWithSameSport.forEach(user => {
        matchablesDict[user.id] = user.id;
    });

    matchables = Object.keys(matchablesDict).sort((a, b) => matchablesDict[b] - matchablesDict[a]);

    matchables = matchables.filter(value => value !== my_id.toString());

    // console.log(matchables[0])
    // console.log(matchables)
};


function showCard(id) {
    // Fetch user data based on the provided ID
    const user = userDB.find((user) => user.id == id);

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


    alert("You've reached the end of the personalized feed! \nThe feed will now start back from the top.")

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
    // console.log("next profile initated");
    // something else to calcualte next user
    calculateMatchingAll();

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



export { calculateMatchingAll, getUserName, nextProfile };