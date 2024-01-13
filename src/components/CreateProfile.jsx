import { isSupported } from 'firebase/analytics';
import React, { useState } from 'react';

const validateUserData = (key, val) => {
    switch (key) {
        case 'preferredName':
            return /(^\w\w)/.test(val) ? '' : 'Must be at least two characters';
        // case 'email':
        //     return /^\w+@\w+[.]\w+/.test(val) ? '' : 'Must contain name@domain.top-level-domain';
        default: return '';
    }
};

const InputField = ({ name, text, state, setState }) => {
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            errors: {
                ...state.errors,
                [e.target.name]: validateUserData(e.target.name, e.target.value),
            }
        });
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{text}</label>
            <input className="form-control" id={name} name={name}
                value={state[name]} onChange={handleChange} />
            <div className="invalid-feedback">{state.errors?.[name]}</div>
        </div>
    );
};

const DropdownForm = ({ text, options }) => {
    // State to keep track of the selected option
    const [selectedOption, setSelectedOption] = useState('');

    // Function to update state on option change
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <form>
            <label>
                Choose a {text}:
                <select value={selectedOption} onChange={handleSelectChange}>
                    {/* <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option> */}
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            {/* {/ You can add more form elements here */}
        </form>
    );
};

function CheckboxForm({ options }) {
    // State to keep track of all checkboxes. Initialize with all false (unchecked)
    const [checkedState, setCheckedState] = useState(
        options.reduce((initialState, option) => {
            initialState[option.value] = false;
            return initialState;
        }, {})
    );

    // Function to update state on checkbox toggle
    const handleCheckboxChange = (event) => {
        setCheckedState({
            ...checkedState,
            [event.target.value]: event.target.checked
        });
    };

    return (
        <form>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={checkedState[option.value]}
                        onChange={handleCheckboxChange}
                    />
                    {option.label}
                </label>
            ))}
            {/* You can add more form elements here */}
        </form>
    );
}


const CreateProfile = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        errors: {}
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (Object.values(state.errors).every(error => error === '')) {
            console.log('Form Data:', state);
            // Handle form submission here
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <InputField name="preferredName" text="Preferred Name" state={state} setState={setState} />
            {/* <InputField name="lastName" text="Last Name" state={state} setState={setState} />
            <InputField name="email" text="Email" state={state} setState={setState} /> */}
            <DropdownForm text="sport" options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
            ]} />
            <DropdownForm text="gym" options={[
                { value: 'spac', label: 'SPAC' },
                { value: 'blom', label: 'Blom' },
            ]} />
            <DropdownForm text="expertise" options={[
                { value: '', label: 'Beginner' },
                { value: '', label: 'Beg/Int' },
                { value: '', label: 'Int' },
                { value: '', label: 'Int/Adv' },
                { value: '', label: 'Adv' },
            ]} />
            <DropdownForm text="gender" options={[
                { value: '', label: 'Female' },
                { value: '', label: 'Male' },
                { value: '', label: 'Gender Fluid' },
                { value: '', label: 'Prefer not to say' },
            ]} />
            <InputField name="Fun" text="Fun Fact" state={state} setState={setState} />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CreateProfile;
