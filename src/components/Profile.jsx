import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import useProfileStore from '../utilities/store';

const Profile = () => {

    const { profile } = useProfileStore();

    return (
        <div className="Profile Page">
            {profile !== null ? (
                <div>
                    <ProfileCard profile={profile} />
                </div>
            ) : (
                <p>No more profiles to display.</p>
            )}
        </div>
    );
}


export default Profile;