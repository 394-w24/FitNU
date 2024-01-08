import DATAFILE from '../data/dummyData.json';

let my_id = 1;
let me = {};
let matchablesDict = {};
let matchables = [];
let seenProfiles = [];

function generateArrayOfDicts() {
    console.log(DATAFILE)

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


    console.log(1)
    let userDB = generateArrayOfDicts()
    console.log(2)
    console.log(userDB)
    me = userDB.find(user => user.id === my_id);
    let usersWithSameSport = me ? findUsersBySport(userDB, me.sport) : [];
    usersWithSameSport.forEach(user => {
        matchablesDict[user.id] = user.id;
    });
    console.log(3)

    matchables = Object.keys(matchablesDict).sort((a, b) => matchablesDict[b] - matchablesDict[a]);



};


function showCard(id) {
    // TODO: GROUP 1 needs to handle showing profile card

    console.log(id);  //temp call for checking that this step is reached
}


function showEmpty() {
    // TODO: handle showing profile card and reaching the end of valid options

    // the following is a temp solution more will need to be done!!!


    alert("You've reached the end of the personalized feed! \nThe feed will now start back from the top.")

    seenProfiles = [];
    nextProfile();

}


function nextProfile() {
    console.log("next profile initated");
    // something else to calcualte next user
    calculateMatchingAll();

    // let uid = matchables.shift()
    let uid = matchables.find(id => !seenProfiles.includes(id));

    if (uid === undefined) {
        showEmpty()
    } else {

        seenProfiles.push(uid);
        showCard(uid);
    }


};



export { nextProfile };