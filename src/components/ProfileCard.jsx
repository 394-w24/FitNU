import React from 'react';
import './ProfileCard.css';



const Card = ({ profile }) => (
    <div className="card m-1 p-2">
        {/* <img src={profile.thumbnail} className="card-img-top" alt={profile.description} /> */}
        <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>

            <p className="card-text">{profile.title}</p>
            <p className="card-text">{formatPrice(profile)}</p>
        </div>
    </div>
);

export default Card;
