// App.js or any React component file where you want to display profiles
import React, { useState, useEffect } from 'react';
import { nextProfile } from './ProfileHandler'; // Import your ProfileHandler function
import ProfileCard from './ProfileCard'; // Import the ProfileCard component

const ProfilePage = () => {
    const [currentUserId, setCurrentUser] = useState(null);

    useEffect(() => {
        // Call nextProfile when the component mounts to initialize the first profile
        nextProfile();
    }, []);

    const showNextProfile = () => {
        nextProfile();
    };

    const onCardClick = () => {
        showNextProfile();
    };

    const changeUser = (id) => {
        setCurrentUser(id);
    }

    ProfilePage.changeUser = changeUser;

    return (
        <div className="Profile Page">
            {currentUserId !== null ? (
                <div>
                    <ProfileCard userId={currentUserId} />
                </div>
            ) : (
                <p>No more profiles to display.</p>
            )}
        </div>
    );
}


export default ProfilePage;