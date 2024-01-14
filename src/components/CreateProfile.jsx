import { isSupported } from 'firebase/analytics';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';

const validateUserData = (key, val) => {
    switch (key) {
        case 'preferredName':
            return /(^\w\w)/.test(val) ? '' : 'Must be at least two characters';
        // case 'email':
        //     return /^\w+@\w+[.]\w+/.test(val) ? '' : 'Must contain name@domain.top-level-domain';
        default: return '';
    }
};

const submitForm = (event) => {

}

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

const DropdownForm = ({ name, text, options, state, setState }) => {
    const handleSelectChange = (event) => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    return (
        <div>
            <label>
                Choose a {text}:
                <select value={state[name]} onChange={handleSelectChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

/*const DropdownForm = ({ text, options }) => {
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
                    <option value="option3">Option 3</option> *
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            {/* {/ You can add more form elements here *
        </form>
    );
};*/

const CheckboxForm = ({ name, text, options, state, setState }) => {
    const handleSelectChange = (event) => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };
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
            <label>
                Choose your preferred days:
                <br>

                </br>
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
            </label>
        </form>
    );
}


const CreateProfile = ({ user, firstTimeUserCallBack }) => {
    const [state, setState] = useState({
        preferredName: '',
        sport: '',
        gym: '',
        expertise: '',
        gender: '',
        funFact: '',
        days: '',
        errors: {}
    });


    const [update, result] = useDbUpdate(`users/${user}`); // if you need to include a dynamic part like userId

    const handleSubmit = (evt) => {
        console.log('called handle submit');
        evt.preventDefault();
        firstTimeUserCallBack(false);
        // Validate terms and conditions agreement
        /*if (!state.termsAgree) {
            alert('Please agree to the terms and conditions.');
            return;
        }*/

        // // Check for other validation errors
        // if (Object.values(state.errors).some(error => error !== '')) {
        //     alert('Please correct the errors in the form.');
        //     return;
        // }

        // // Convert necessary fields to numbers
        // const processedData = {
        //     ...state,
        //     age: Number(state.age) || 0, // Example of converting 'age' field to a number
        //     // ... other fields to convert
        // };

        // // Remove errors from the data being sent
        // delete processedData.errors;

        // // Send data to Firebase
        // update(processedData).then(() => {
        //     console.log('Data successfully submitted to Firebase');
        // }).catch(error => {
        //     console.error('Error submitting data to Firebase:', error);
        // });
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <InputField name="preferredName" text="Preferred Name" state={state} setState={setState} />
            {/* <InputField name="lastName" text="Last Name" state={state} setState={setState} />
            <InputField name="email" text="Email" state={state} setState={setState} /> */}
            <DropdownForm name="sport" text="sport" options={[
                { value: 'cardio', label: 'Cardio' },
                { value: 'strength', label: 'Strength training' },
                { value: 'group', label: 'Group sports' },
                { value: 'yoga', label: 'Yoga/pilates' },
                { value: 'outdoor', label: 'Outdoor activities' },
            ]} state={state} setState={setState} />
            <DropdownForm name="gym" text="gym" options={[
                { value: 'spac', label: 'SPAC' },
                { value: 'blom', label: 'Blom' },
            ]} state={state} setState={setState} />
            <DropdownForm name="expertise" text="expertise" options={[
                { value: 'beg', label: 'Beginner' },
                { value: 'begint', label: 'Beg/Int' },
                { value: 'int', label: 'Int' },
                { value: 'intadv', label: 'Int/Adv' },
                { value: 'adv', label: 'Adv' },
            ]} state={state} setState={setState} />
            <DropdownForm name="gender" text="gender" options={[
                { value: 'fe', label: 'Female' },
                { value: 'm', label: 'Male' },
                { value: 'n', label: 'Nonbinary' },
                { value: 'g', label: 'Gender Fluid' },
                { value: 'p', label: 'Prefer not to say' },
            ]} state={state} setState={setState} />
            <CheckboxForm name="days" text="days" options={[
                { value: 'm', label: 'Monday' },
                { value: 'tu', label: 'Tuesday' },
                { value: 'w', label: 'Wednesday' },
                { value: 'th', label: 'Thursday' },
                { value: 'f', label: 'Friday' },
                { value: 'sa', label: 'Saturday' },
                { value: 'su', label: 'Sunday' },
            ]} state={state} setState={setState} />
            <InputField name="Fun" text="Fun Fact" state={state} setState={setState} />
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default CreateProfile;
