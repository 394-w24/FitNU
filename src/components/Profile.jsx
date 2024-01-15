import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import useProfileStore from '../utilities/store';
import "./Profile.css"
import { matchableCount, calculateMatchingAll } from "./ProfileHandler";

const Profile = () => {

    const { profile } = useProfileStore();

    return (
        <div className="profile-page">
            {profile !== null ? (
                <div>
                    <ProfileCard profile={profile} />
                </div>
            ) : matchableCount() < 1 ? (
                <p>No available matches right now, please try again later</p>
            ) : (
                <p></p>
            )}
        </div>
    );
}


export default Profile;