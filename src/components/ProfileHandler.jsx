import DATAFILE from '../data/dummyData.json';
import useProfileStore from '../utilities/store';
import { useDbData, useDbUpdate } from "../utilities/firebase";

let my_id = "0";
let mySelf = {};
let userDB = [];
let matchables = [];
let seenProfiles = [];
let savedProfiles = []

function setUID(id) {
    my_id = id;
    // console.log(my_id)
}

function getUID() {
    return my_id
    // console.log(my_id)
}

function seenProfilesClear() {
    seenProfiles = []
}


function matchableClear() {
    matchables = []
}

function matchableCount(id) {
    let diff = matchables.length - seenProfiles.length
    return diff > 0 ? diff : 0
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
                days: user?.days === undefined ? [-1, -2] : user.days,
                location: user?.location === undefined ? -1 : user.location,
                expertise: user?.expertise === undefined ? -1 : user.expertise,
                sport: user?.sport === undefined ? 'Null' : user.sport,
                funFact: user?.funFact === undefined ? 'Null' : user.funFact,
                photoURL: user?.photoURL === undefined ? 'Null' : user.photoURL,
                preferredName: user?.preferredName === undefined ? '' : user.preferredName
            };
        });

        // Print or use the generated array of dictionaries
        userDB = arrayOfDicts;
    }
}

function calculateMatchingAll(origin) {
    // TODO: calculate a matching score for the various users. For now we are just finding all same-sport users
    generateArrayOfDicts()
    // console.log(userDB)
    if (userDB) {
        matchableClear()
        mySelf = userDB.find(user => user.id.toString() == my_id.toString());
        if (!mySelf) { return -1; }
        //console.log("myself:", mySelf, my_id, userDB)
        let matchingUsers = userDB.filter(user =>
            user.id !== my_id &&
            (user.gender === mySelf.gender ||
                user.location === mySelf.location ||
                user.days.some(day => mySelf.days.includes(day)) ||
                user.expertise === mySelf.expertise ||
                user.sport === mySelf.sport)
        );
        // Sort matchingUsers by the number of matching fields
        matchingUsers.sort((userA, userB) => {
            const matchingFieldsA = Object.values(userA).filter(valueA => {
                if (Array.isArray(valueA) && valueA.length > 0) {
                    return valueA.some(day => mySelf.days.includes(day));
                }
                return Object.values(mySelf).includes(valueA);
            }).length;

            const matchingFieldsB = Object.values(userB).filter(valueB => {
                if (Array.isArray(valueB) && valueB.length > 0) {
                    return valueB.some(day => mySelf.days.includes(day));
                }
                return Object.values(mySelf).includes(valueB);
            }).length;

            return matchingFieldsB - matchingFieldsA;
        });
        matchingUsers.forEach(user => {
            // console.log(user)
            matchables.push(user.id.toString());
        });
        //console.log("matchingusers", matchables)

        // console.log("self:", my_id, "matches:", matchables)
        return 0
    }
    return 1
    // console.log(matchables[0])
};


function compareMatches(id) {
    var target = userDB.find((user) => user.id == id);

    const sharedKeys = Object.keys(mySelf).filter(key => target.hasOwnProperty(key) && mySelf[key] === target[key]);

    const keysWithEqualValues = sharedKeys.filter(key => mySelf[key] === target[key]);


    return keysWithEqualValues;

}

function dayMatcher(id) {
    var target = userDB.find((user) => user.id == id);


    var daymatches = [];
    //console.log("my days", myVals)
    for (var day in target.days) {
        // console.log('targ', target.days[day])
        if (mySelf.days.includes(target.days[day])) {
            daymatches.push(target.days[day]);
        }
    }
    //console.log("matched days", daymatches)
    return daymatches
}


function showCard(id) {
    // Fetch user data based on the provided ID
    const user = userDB.find((user) => user.id == id);

    //console.log("showcard", user)

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

    useProfileStore.setState({ profile: null });
    // alert("You've reached the end of the personalized feed!")


}


function getLastUser() {
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

function startFromBeginning() {

    seenProfilesClear();

    let uid = matchables[0];

    console.log(uid)
    if (uid === undefined) {
        showEmpty()
    } else {

        seenProfiles.push(uid);
        showCard(uid);
    }
}

function nextProfile() {

    // let uid = matchables.shift()
    let uid = matchables.find(id => !seenProfiles.includes(id));

    //console.log(uid)
    if (uid === undefined) {
        showEmpty()
    } else {

        seenProfiles.push(uid);
        showCard(uid);
    }

};

function saveLast() {
    savedProfiles.push(getLastUser());
}

function getSaved() {
    return savedProfiles;
}



export { getUID, setUID, startFromBeginning, seenProfilesClear, matchableClear, matchableCount, calculateMatchingAll, getUserName, nextProfile, compareMatches, dayMatcher, saveLast };