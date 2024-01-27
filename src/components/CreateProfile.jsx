import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';
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
                        checked={state[name][option.value] || false}
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
    return (
        Object.entries(days).map(([key, val]) => val ? Number(key) : -1).filter(day => day !== -1)
    );
}

const arrayToDaysObject = (daysArray) => {
    const daysObject = {};
    daysArray.forEach(day => daysObject[day] = true);
    return daysObject;
};

function CreateProfile({ user, userData, firstTimeUserCallBack }) {
    // const [userData, userDataError] = useDbData(`/users/${user.uid}/`);
    const [update] = useDbUpdate(`/users/${user.uid}/`);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log('userData', userData?.preferredName);

    // TO-DO: ADD IMAGE INPUT FIELD
    const [state, setState] = useState(userData ? {
        preferredName: userData.preferredName,
        sport: userData.sport,
        location: userData.location,
        expertise: userData.expertise,
        gender: userData.gender,
        funFact: userData.funFact,
        days: arrayToDaysObject(userData.days),
        errors: {}
    } : {
        preferredName: '',
        sport: 'cardio',
        location: 0,
        expertise: 0,
        gender: 'male',
        funFact: '',
        days: {},
        errors: {}
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        update({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
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
    };

    return (
        <div className='form-container' style={location.pathname === "/EditProfile" ? { overflow: "auto", marginTop: "250px" } : {
            overflow: "auto"
        }}>
            <form className='profile-form' onSubmit={handleSubmit} id="create-profile" name="create-profile" noValidate>
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
