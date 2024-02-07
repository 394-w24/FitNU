import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDbUpdate, useDbRead } from '../utilities/firebase';
import Button from "@mui/material/Button";



// for image uploads
import { storage } from '../utilities/firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary methods

import "./CreateProfile.css";
import { seenProfilesClear, startFromBeginning } from "./ProfileHandler";

function validateField(key, value) {
    const validators = {
        preferredName: val => val.length >= 2 ? '' : 'Must be at least two characters',
        // Other fields can have their validators here
    };
    return validators[key] ? validators[key](value) : '';
}

function FormField({ label, type, name, state, setState }) {
    const onChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
            errors: { ...prevState.errors, [name]: validateField(name, value) }
        }));
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={state[name]}
                onChange={onChange}
            />
            {state.errors[name] && <div className="text-danger">{state.errors[name]}</div>}
        </div>
    );
}

function SelectField({ label, name, options, state, setState }) {
    const onChange = (e) => {
        setState({ ...state, [name]: e.target.value });
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" id={name} value={state[name]} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

function CheckboxGroup({ label, name, options, state, setState }) {
    const onChange = (e) => {
        const { value, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], [value]: checked }
        }));
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            {options.map(option => (
                <div key={option.value} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={option.value}
                        checked={Array.isArray(state.days) ? state.days.includes(option.value) : (state[name][option.value] || false)}
                        // checked={state[name][option.value] || false} 
                        // checked={state.days.includes(option.value)}
                        onChange={onChange}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
}

const mapDaysToArr = (days) => {
    console.log(days)
    return (
        Object.entries(days).map(([key, val]) => val ? Number(key) : -1).filter(day => day !== -1)
    );
}

// for image uploads
// function ImageUploadField({ state, setState }) {
//     const handleImageChange = (e) => {
//         if (e.target.files[0]) {
//             const image = e.target.files[0];
//             setState({ ...state, image });
//         }
//     };

//     return (
//         <div className="form-group">
//             <label htmlFor="image">Profile Image</label>
//             <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 onChange={handleImageChange}
//             />
//         </div>
//     );
// }

// for image uploads, seperately
// ImageUploadForm Component
// function ImageUploadForm({ user, setState, updateDb }) {
//     const [image, setImage] = useState(null);

//     const handleImageChange = (e) => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     const handleImageSubmit = (event) => {
//         event.preventDefault();
//         if (image) {
//             const imageRef = ref(storage, `profile_images/${user.uid}/${image.name}`);
//             uploadBytes(imageRef, image).then((snapshot) => {
//                 getDownloadURL(snapshot.ref).then((url) => {
//                     // Update the parent component's state
//                     setState(prevState => ({ ...prevState, photoURL: url }));

//                     // Update the Firebase Realtime Database
//                     updateDb(url);
//                 });
//             });
//         }
//     };

//     return (
//         <form onSubmit={handleImageSubmit} className="image-upload-form">
//             <div className="form-group">
//                 <label htmlFor="image">Profile Image</label>
//                 <input
//                     type="file"
//                     className="form-control"
//                     id="image"
//                     onChange={handleImageChange}
//                 />
//             </div>
//             <Button type="submit" variant="contained" color="primary">Upload Image</Button>

//         </form>
//     );
// }








// for image uploads
// function ImageUploadField({ state, setState }) {
//     const handleImageChange = (e) => {
//         if (e.target.files[0]) {
//             const image = e.target.files[0];
//             setState({ ...state, image });
//         }
//     };

//     return (
//         <div className="form-group">
//             <label htmlFor="image">Profile Image</label>
//             <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 onChange={handleImageChange}
//             />
//         </div>
//     );
// }

// for image uploads, seperately
// ImageUploadForm Component
function ImageUploadForm({ user, setState, updateDb }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageSubmit = (event) => {
        event.preventDefault();
        if (image) {
            const imageRef = ref(storage, `profile_images/${user.uid}/${image.name}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    // Update the parent component's state
                    setState(prevState => ({ ...prevState, photoURL: url }));

                    // Update the Firebase Realtime Database
                    updateDb(url);
                });
            });
        }
    };

    return (
        <form onSubmit={handleImageSubmit} className="image-upload-form">
            <div className="form-group">
                <label htmlFor="image">Profile Image</label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImageChange}
                />
            </div>
            <Button type="submit" variant="contained" color="primary">Upload Image</Button>

        </form>
    );
}

const arrayToDaysObject = (daysArray) => {
    const daysObject = {};

    // TODO: Murat mentioned something here got deleted, so add that back later.
    // the below filler is just to get it temproarily back to working
    // var filler = 1;
    // filler += 1;
    daysArray.forEach(day => daysObject[day] = true);
    return daysObject;
};

function CreateProfile({ user, userData, firstTimeUserCallBack }) {
    const [update] = useDbUpdate(`/users/${user.uid}/`);
    const navigate = useNavigate()
    const location = useLocation();
    // if(location === "EditProfile")
    //console.log(userData);

    // TO-DO: ADD IMAGE INPUT FIELD
    const [state, setState] = useState(userData ? {
        preferredName: userData.preferredName,
        sport: userData.sport,
        location: userData.location,
        expertise: userData.expertise,
        gender: userData.gender,
        funFact: userData.funFact,
        photoURL: userData.photoURL,
        days: "days" in userData ? arrayToDaysObject(userData.days) : {},
        errors: {}
    } : {
        preferredName: '',
        sport: 'cardio',
        location: 0,
        expertise: 0,
        gender: 'male',
        funFact: '',
        days: [],
        photoURL: user.photoURL,
        errors: {}
    });

    // for populate the edit profile form
    // Fetch user data when component mounts
    // useEffect(() => {
    //     if (!loading && userData && !error) {
    //         setState(prevState => ({
    //             ...prevState,
    //             ...userData,
    //             days: Array.isArray(userData.days) ? userData.days : [],
    //             errors: {}
    //         }));
    //     }

    //     console.log(userData);
    // }, [userData, loading, error]);

    // useEffect(() => {
    //     if (!loading && userData && !error) {
    //         setState({
    //             ...state,
    //             ...userData,
    //             errors: {}
    //         });
    //     }

    //     console.log(userData)
    //     // console.log(userData.days)
    // }, [userData, loading, error]);

    const handleSubmit = (event) => {
        event.preventDefault();
        update({
            name: user.displayName,
            email: user.email,
            photoURL: state.photoURL, // Use photoURL from state
            days: mapDaysToArr(state.days),
            sport: state.sport,
            location: Number(state.location),
            funFact: state.funFact,
            preferredName: state.preferredName,
            gender: state.gender,
            expertise: Number(state.expertise)
        });
        seenProfilesClear();
        startFromBeginning();
        firstTimeUserCallBack(false);
        navigate("/");

        // for image uploads
        // if (state.image) {
        //     const imageRef = ref(storage, `profile_images/${user.uid}/${state.image.name}`);
        //     uploadBytes(imageRef, state.image).then((snapshot) => {
        //         getDownloadURL(snapshot.ref).then((url) => {
        //             updateProfile(url);
        //         });
        //     });
        // } else {
        //     updateProfile(user.photoURL);
        // }

        // return (
        //     <div className='form-container' style={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         padding: '20px',
        //         margin: '20px auto',
        //         maxWidth: '500px',
        //         backgroundColor: '#f7f7f7',
        //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        //         borderRadius: '10px',
        //     }}>
        //         <ImageUploadForm user={user} setState={setState} />
        //         <form className='profile-form' onSubmit={handleSubmit} noValidate>
        //             {/* Other form fields */}
        //             <button type="submit" className="btn btn-primary">Submit Profile</button>
        //         </form>
        //     </div>
        // );


    };

    // // for image uploads
    // const updateProfile = (photoURL) => {
    //     update({ photoURL }).then(() => {
    //         firstTimeUserCallBack(false);
    //         navigate("/");
    //     });
    // };

    // for image uploads
    const updateProfile = (photoURL) => {
        update({
            photoURL
        });
        firstTimeUserCallBack(false);
        // navigate("/");
    };


    return (
        <div className="form-and-image-container" style={location.pathname === "/EditProfile" ? { overflow: "auto", marginTop: "100px" } : {
            overflow: "auto"
        }}>



            {/* Image Display Section with Circular Frame */}
            {state.photoURL && (
                <div className="image-circle-frame">
                    <img src={state.photoURL} alt="Uploaded Profile" />
                </div>
            )}


            {/* <ImageUploadForm user={user} setState={setState} /> */}
            <ImageUploadForm user={user} setState={setState} updateDb={updateProfile} />



            <form className='profile-form' onSubmit={handleSubmit} id="create-profile" name="create-profile" noValidate>
                {/* for image uploads
                <ImageUploadField state={state} setState={setState} /> */}



                <FormField label="Preferred Name" type="text" name="preferredName" state={state} setState={setState} />
                <br />
                <SelectField
                    label="Gender"
                    name="gender"
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'nonBinary', label: 'Non-Binary' },
                        { value: 'preferNotToSay', label: 'Prefer Not to Say' },
                        // ... add more options as needed
                    ]}
                    state={state}
                    setState={setState}
                />
                <br />
                <SelectField
                    label="Sport"
                    name="sport"
                    options={[
                        { value: 'cardio', label: 'Cardio (e.g., running, cycling)' },
                        { value: 'strengthTraining', label: 'Strength training (e.g., weightlifting)' },
                        { value: 'groupSports', label: 'Group sports (e.g., basketball, soccer)' },
                        { value: 'yogaPilates', label: 'Yoga/Pilates' },
                        { value: 'outdoorActivities', label: 'Outdoor activities (e.g., hiking, rock climbing)' },
                    ]}
                    state={state}
                    setState={setState}
                />
                <br />
                <SelectField
                    label="Preferred Gym"
                    name="location"
                    options={[
                        { value: 0, label: 'SPAC' },
                        { value: 1, label: 'Blom' },
                    ]}
                    state={state}
                    setState={setState}
                />
                <br />
                <SelectField
                    label="Expertise"
                    name="expertise"
                    options={[
                        { value: 0, label: 'None' },
                        { value: 1, label: 'Beg' },
                        { value: 2, label: 'Int' },
                        { value: 3, label: 'Adv' },
                        { value: 4, label: 'Expert' },
                    ]}
                    state={state}
                    setState={setState}
                />
                <br />
                <CheckboxGroup
                    label="Days"
                    name="days"
                    options={[
                        { value: 1, label: 'Monday' },
                        { value: 2, label: 'Tuesday' },
                        { value: 3, label: 'Wednesday' },
                        { value: 4, label: 'Thursday' },
                        { value: 5, label: 'Friday' },
                        { value: 6, label: 'Saturday' },
                        { value: 7, label: 'Sunday' },
                    ]}
                    state={state}
                    setState={setState}
                />
                <br />
                <FormField label="Fun Fact" type="text" name="funFact" state={state} setState={setState} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateProfile;
