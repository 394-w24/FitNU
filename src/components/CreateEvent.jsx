import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import "./CreateEvent.css";

const validateUserData = (key, val) => {
    // Add validation logic as needed
    console.log('Validating', key, val);
    return '';
};

const InputField = ({ name, text, state, change }) => {
    console.log('Rendering InputField', name, state);
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
    console.log('Rendering ButtonBar', message);
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const CreateEvent = ({ user }) => {
    const navigate = useNavigate();
    console.log('User ID:', user.uid);
    const userData = { id: user.uid, /* other needed fields */ };

    const [update, result] = useDbUpdate(`/events/${userData.id}`);
    const [state, change] = useFormData(validateUserData, userData);

    const submit = (evt) => {
        evt.preventDefault();
        console.log('Submitting form', state);
        if (!state.errors) {
            // Destructure to exclude 'id' from the update data
            const { id, ...updateData } = state.values;
            console.log('Updating database with:', updateData);
            console.log('Update function is a Promise:', update instanceof Promise);
            update(updateData).then(() => {
                console.log('Data successfully updated to Firebase');
                navigate('/GeneralView');
            }).catch(error => {
                console.error('Error updating data to Firebase:', error);
            });
        } else {
            console.log('Form has errors, not submitting', state.errors);
        }
    };


    console.log('Rendering CreateEvent', state, result);

    return (
        <div className='form-container' style={location.pathname === "/EditEvent" ? { overflow: "auto", marginTop: "250px" } : { overflow: "auto" }}>
            <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
                <InputField name="title" text="Title of Event" state={state} change={change} />
                <InputField name="desc" text="Event Description" state={state} change={change} />
                <InputField name="location" text="Location" state={state} change={change} />
                <InputField name="date" text="Date" state={state} change={change} />
                <ButtonBar message={result?.message} />
            </form>
        </div>
    );
};

export default CreateEvent;
