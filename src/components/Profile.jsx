import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import useProfileStore from '../utilities/store';
import "./Profile.css"

const Profile = () => {

    const { profile } = useProfileStore();

    return (
        <div className="profile-page">
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