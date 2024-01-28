import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';
import "./CreateEvent.css";
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
            errors: { ...prevState.errors || {}, [name]: validateField(name, value) }
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


const mapDaysToArr = (days) => {
    return (
        Object.entries(days).map(([key, val]) => val ? Number(key) : -1).filter(day => day !== -1)
    );
}

function CreateEvent({ user }) {
    //console.log(user.uid);
    const [update] = useDbUpdate(`/events/${user.uid}/`);
    const navigate = useNavigate();
    // const location = useLocation();
    // if(location === "EditProfile")


    // TO-DO: ADD IMAGE INPUT FIELD
    const [state, setState] = useState({
        title: 'default title',
        desc: 'default desc',
        location: 'default location',
        date: 'default date'
    });

    console.log(state);

    const handleSubmit = (event) => {
        event.preventDefault();
        update({
            title: state.title,
            desc: state.desc,
            location: state.location,
            date: state.date
        });
        navigate("/GeneralView");
    };

    return (
        <div className='form-container' style={location.pathname === "/EditEvent" ? { overflow: "auto", marginTop: "250px" } : {
            overflow: "auto"
        }}>
            {/* // <div className='form-container'> */}
            <form className='event-form' onSubmit={handleSubmit} noValidate>
                <FormField label="Title of Event" type="text" name="title" state={state} setState={setState} />
                <FormField label="Event Description" type="text" name="desc" state={state} setState={setState} />
                <FormField label="Location" type="text" name="location" state={state} setState={setState} />
                <FormField label="Date" type="text" name="date" state={state} setState={setState} />
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateEvent;
