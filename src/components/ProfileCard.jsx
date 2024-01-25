import React from 'react';
import './ProfileCard.css';

//map day numbers to day names
const mapDayNumberToName = (dayNumbers) => {
    const daysMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return dayNumbers.map(number => daysMap[number - 1]).join(', ');
};

//convert location number to string
const getLocationName = (locationNumber) => {
    const locations = { 0: "SPAC", 1: "Blom" };

    return locations[locationNumber] || "Unknown Location";
};

//convert expertise number to string
const getExpertiseLevel = (expertiseNumber) => {
    const expertiseLevels = {
        0: 'No Experience',
        1: 'Beginner',
        2: 'Intermediate',
        3: 'Advanced',
        4: 'Expert'
    };
    return expertiseLevels[expertiseNumber] || "Unknown Expertise Level";
};

const getBetterName = (profile) => {

    if (profile.preferredName !== '') {
        console.log("prefered", profile.preferredName)
        return profile.preferredName;
    }
    console.log("nopreferred")
    return profile.name;
};

const getFieldColor = (key, keysWithEqualValues) => {
    return isKeyEqual(key, keysWithEqualValues) ? 'green' : 'red';
}
const isKeyEqual = (key, keysWithEqualValues) => {

    console.log("keys", keysWithEqualValues)
    // return 1
    return keysWithEqualValues.includes(key);
}

const dayColorMatch = (days, matchedDays) => {
    if (matchedDays) {
        mapDayNumberToName(profile.days)
    }
}

const Card = ({ profile }) => (
    <div className="card m-1 p-2">
        {/* <img src={profile.thumbnail} className="card-img-top" alt={profile.description} /> */}
        <div className="card-body">
            <h5 className="card-title">{getBetterName(profile)}</h5>
            <p className="card-text">
                <strong>Gender: </strong>
                <span style={{ color: getFieldColor('gender', profile.keymatches) }}>
                    {profile.gender}
                </span>
            </p>
            <p className="card-text">
                <strong>Days: </strong>
                {/* <span style={{ color: getFieldColor('days', profile.keymatches) }}> */}
                {mapDayNumberToName(profile.days)}
                {/* </span> */}
            </p>
            <p className="card-text">
                <strong>Location: </strong>
                <span style={{ color: getFieldColor('location', profile.keymatches) }}>
                    {getLocationName(profile.location)}
                </span>
            </p>
            <p className="card-text">
                <strong>Expertise: </strong>
                <span style={{ color: getFieldColor('expertise', profile.keymatches) }}>
                    {getExpertiseLevel(profile.expertise)}
                </span>
            </p>
            <p className="card-text">
                <strong>Sport: </strong>
                <span style={{ color: getFieldColor('sport', profile.keymatches) }}>
                    {profile.sport}
                </span>
            </p>
            <p className="card-text"><strong>Fun Fact:</strong> {profile.funFact}</p>
        </div>
    </div>
);

export default Card;
