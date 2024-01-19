import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import useProfileStore from '../utilities/store';
import "./Profile.css"
import { getUID, matchableCount } from "./ProfileHandler";

const Profile = () => {

    const { profile } = useProfileStore();
    const uid = getUID();
    console.log("uid", uid)
    console.log(matchableCount(uid))
    // if (matchableCount(uid) < 1) {
    //     console.log(1)
    // }

    return (
        <div className="profile-page">
            {profile !== null ? (
                <div>
                    <ProfileCard profile={profile} />
                </div>
            ) : matchableCount(uid) < 1 ? (
                <p>No available matches right now, please try again later</p>
            ) : (
                <p></p>
            )}
        </div>
    );
}


export default Profile;