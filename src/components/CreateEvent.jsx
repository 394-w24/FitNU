import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import "./CreateEvent.css";

const validateUserData = (key, val) => {
    // Add validation logic as needed
    //console.log('Validating', key, val);
    return '';
};

const InputField = ({ name, text, state, change }) => {
    //console.log('Rendering InputField', name, state);
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{text}</label>
            <input className="form-control" id={name} name={name}
                defaultValue={state.values?.[name]} onChange={change} />
            <div className="invalid-feedback">{state.errors?.[name]}</div>
        </div>
    );
};

const ButtonBar = ({ message, disabled }) => {
    const navigate = useNavigate();
    //console.log('Rendering ButtonBar', message);
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const CreateEvent = ({ user, events, nextId }) => {
    const navigate = useNavigate();
    const [update, updateResult] = useDbUpdate();
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        location: '',
        date: '' // Initialize with empty fields or defaults
    });
    const [formErrors, setFormErrors] = useState({}); // To keep track of form errors

    console.log("nextid: ", nextId);

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        // Reset individual field error
        setFormErrors(prevFormErrors => ({
            ...prevFormErrors,
            [name]: validateUserData(name, value)
        }));
    }, []);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // Perform validation
        const newFormErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateUserData(key, formData[key]);
            if (error) {
                newFormErrors[key] = error;
            }
        });

        if (Object.keys(newFormErrors).length === 0) {
            // If there are no errors, proceed to add the event
            const newEventKey = nextId.toString();
            const newEvents = {
                ...events,
                [newEventKey]: { ...formData, id: user.uid } // Add new event data
            };

            const path = `/events/`;
            const value = newEvents;

            // Use the update function to update the entire events object
            update(path, value)
                .then(() => {
                    navigate("/GeneralView")
                    console.log("Events updated successfully") // Navigate to the new event's page
                })
                .catch((error) => {
                    console.error("Error creating event:", error);
                });
        } else {
            // Update state with the validation errors
            setFormErrors(newFormErrors);
        }
    };




    //console.log('Rendering CreateEvent', state, result);

    return (
        <div className='form-container' style={location.pathname === "/EditEvent" ? { overflow: "auto" } : { overflow: "auto" }}>
            <form onSubmit={handleSubmit} noValidate>
                <InputField name="title" text="Title of Event" state={formData} change={handleInputChange} />
                <InputField name="desc" text="Event Description" state={formData} change={handleInputChange} />
                <InputField name="location" text="Location" state={formData} change={handleInputChange} />
                <InputField name="date" text="Date" state={formData} change={handleInputChange} />
                <ButtonBar message={updateResult?.message || ''} />
            </form>
        </div>
    );
};

export default CreateEvent;
