import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';
import "./CreateProfile.css";
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

function CreateEvent({ }) {
    //console.log(user.uid);
    const [update] = useDbUpdate(`/users/${user.uid}/`);
    const navigate = useNavigate()
    // const location = useLocation();
    // if(location === "EditProfile")


    // TO-DO: ADD IMAGE INPUT FIELD
    const [state, setState] = useState({
        preferredName: '',
        sport: 'cardio',
        gym: '0',
        expertise: '0',
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
            gym: Number(state.gym),
            funFact: state.funFact,
            preferredName: state.preferredName,
            gender: state.gender,
            expertise: Number(state.expertise)
        });
        firstTimeUserCallBack(false);
        navigate("/");
    };

    return (
        <div className='form-container' style={location.pathname === "/EditEvent" ? { overflow: "auto", marginTop: "250px" } : {
            overflow: "auto"
        }}>
            <form className='profile-form' onSubmit={handleSubmit} noValidate>
                <FormField label="Title of Event" type="text" name="title" state={state} setState={setState} />
                <FormField label="Event Description" type="text" name="desc" state={state} setState={setState} />
                <FormField label="Location" type="text" name="location" state={state} setState={setState} />
                <FormField label="Date" type="text" name="location" state={state} setState={setState} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateEvent;
