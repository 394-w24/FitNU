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
        1: "Beginner",
        2: "Intermediate",
        3: "Advanced",
        4: "Expert"
    };
    return expertiseLevels[expertiseNumber] || "Unknown Expertise Level";
};

const Card = ({ profile }) => (
    <div className="card m-1 p-2">
        {/* <img src={profile.thumbnail} className="card-img-top" alt={profile.description} /> */}
        <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text"><strong>Gender:</strong> {profile.gender}</p>
            <p className="card-text"><strong>Days:</strong> {mapDayNumberToName(profile.days)}</p>
            <p className="card-text"><strong>Location:</strong> {getLocationName(profile.location)}</p>
            <p className="card-text"><strong>Expertise:</strong> {getExpertiseLevel(profile.expertise)}</p>
            <p className="card-text"><strong>Sport:</strong> {profile.sport}</p>
            <p className="card-text"><strong>Fun Fact:</strong> {profile.funFact}</p>
        </div>
    </div>
);

export default Card;
