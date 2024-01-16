// import { isSupported } from 'firebase/analytics';
// import React, { useState } from 'react';
// import { useDbUpdate } from '../utilities/firebase';

// const validateUserData = (key, val) => {
//     switch (key) {
//         case 'preferredName':
//             return /(^\w\w)/.test(val) ? '' : 'Must be at least two characters';
//         // case 'email':
//         //     return /^\w+@\w+[.]\w+/.test(val) ? '' : 'Must contain name@domain.top-level-domain';
//         default: return '';
//     }
// };

// const submitForm = (event) => {

// }

// const InputField = ({ name, text, state, setState }) => {
//     const handleChange = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value,
//             errors: {
//                 ...state.errors,
//                 [e.target.name]: validateUserData(e.target.name, e.target.value),
//             }
//         });
//     };

//     return (
//         <div className="mb-3">
//             <label htmlFor={name} className="form-label">{text}</label>
//             <input className="form-control" id={name} name={name}
//                 value={state[name]} onChange={handleChange} />
//             <div className="invalid-feedback">{state.errors?.[name]}</div>
//         </div>
//     );
// };

// const DropdownForm = ({ name, text, options, state, setState }) => {
//     const handleSelectChange = (event) => {
//         setState({
//             ...state,
//             [name]: event.target.value
//         });
//     };

//     return (
//         <div>
//             <label>
//                 Choose a {text}:
//                 <select value={state[name]} onChange={handleSelectChange}>
//                     {options.map((option, index) => (
//                         <option key={index} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </label>
//         </div>
//     );
// };

// /*const DropdownForm = ({ text, options }) => {
//     // State to keep track of the selected option
//     const [selectedOption, setSelectedOption] = useState('');

//     // Function to update state on option change
//     const handleSelectChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     return (
//         <form>
//             <label>
//                 Choose a {text}:
//                 <select value={selectedOption} onChange={handleSelectChange}>
//                     {/* <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option> *
//                     {options.map((option, index) => (
//                         <option key={index} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </label>
//             {/* {/ You can add more form elements here *
//         </form>
//     );
// };*/

// const CheckboxForm = ({ name, text, options, state, setState }) => {
//     const handleSelectChange = (event) => {
//         setState({
//             ...state,
//             [name]: event.target.value
//         });
//     };
//     // State to keep track of all checkboxes. Initialize with all false (unchecked)
//     const [checkedState, setCheckedState] = useState(
//         options.reduce((initialState, option) => {
//             initialState[option.value] = false;
//             return initialState;
//         }, {})
//     );

//     // Function to update state on checkbox toggle
//     const handleCheckboxChange = (event) => {
//         setCheckedState({
//             ...checkedState,
//             [event.target.value]: event.target.checked
//         });
//     };

//     return (
//         <form>
//             <label>
//                 Choose your preferred days:
//                 <br>

//                 </br>
//                 {options.map((option, index) => (
//                     <label key={index}>
//                         <input
//                             type="checkbox"
//                             value={option.value}
//                             checked={checkedState[option.value]}
//                             onChange={handleCheckboxChange}
//                         />
//                         {option.label}
//                     </label>
//                 ))}
//                 {/* You can add more form elements here */}
//             </label>
//         </form>
//     );
// }


// const CreateProfile = ({ user, firstTimeUserCallBack }) => {
//     const [state, setState] = useState({
//         preferredName: '',
//         sport: '',
//         gym: '',
//         expertise: '',
//         gender: '',
//         funFact: '',
//         days: '',
//         errors: {}
//     });


//     const [update, result] = useDbUpdate(`users/${user}`); // if you need to include a dynamic part like userId

//     const handleSubmit = (evt) => {
//         console.log('called handle submit');
//         evt.preventDefault();
//         console.log(state);

//         //firstTimeUserCallBack(false);

//         // Validate terms and conditions agreement
//         /*if (!state.termsAgree) {
//             alert('Please agree to the terms and conditions.');
//             return;
//         }*/

//         // // Check for other validation errors
//         // if (Object.values(state.errors).some(error => error !== '')) {
//         //     alert('Please correct the errors in the form.');
//         //     return;
//         // }

//         // // Convert necessary fields to numbers
//         // const processedData = {
//         //     ...state,
//         //     age: Number(state.age) || 0, // Example of converting 'age' field to a number
//         //     // ... other fields to convert
//         // };

//         // // Remove errors from the data being sent
//         // delete processedData.errors;

//         // // Send data to Firebase
//         // update(processedData).then(() => {
//         //     console.log('Data successfully submitted to Firebase');
//         // }).catch(error => {
//         //     console.error('Error submitting data to Firebase:', error);
//         // });
//     };

//     return (
//         <form onSubmit={handleSubmit} noValidate>
//             <InputField name="preferredName" text="Preferred Name" state={state} setState={setState} />
//             {/* <InputField name="lastName" text="Last Name" state={state} setState={setState} />
//             <InputField name="email" text="Email" state={state} setState={setState} /> */}
//             <DropdownForm name="sport" text="sport" options={[
//                 { value: 'cardio', label: 'Cardio' },
//                 { value: 'strength', label: 'Strength training' },
//                 { value: 'group', label: 'Group sports' },
//                 { value: 'yoga', label: 'Yoga/pilates' },
//                 { value: 'outdoor', label: 'Outdoor activities' },
//             ]} state={state} setState={setState} />
//             <DropdownForm name="gym" text="gym" options={[
//                 { value: 'spac', label: 'SPAC' },
//                 { value: 'blom', label: 'Blom' },
//             ]} state={state} setState={setState} />
//             <DropdownForm name="expertise" text="expertise" options={[
//                 { value: 'beg', label: 'Beginner' },
//                 { value: 'begint', label: 'Beg/Int' },
//                 { value: 'int', label: 'Int' },
//                 { value: 'intadv', label: 'Int/Adv' },
//                 { value: 'adv', label: 'Adv' },
//             ]} state={state} setState={setState} />
//             <DropdownForm name="gender" text="gender" options={[
//                 { value: 'fe', label: 'Female' },
//                 { value: 'm', label: 'Male' },
//                 { value: 'n', label: 'Nonbinary' },
//                 { value: 'g', label: 'Gender Fluid' },
//                 { value: 'p', label: 'Prefer not to say' },
//             ]} state={state} setState={setState} />
//             <CheckboxForm name="days" text="days" options={[
//                 { value: 'm', label: 'Monday' },
//                 { value: 'tu', label: 'Tuesday' },
//                 { value: 'w', label: 'Wednesday' },
//                 { value: 'th', label: 'Thursday' },
//                 { value: 'f', label: 'Friday' },
//                 { value: 'sa', label: 'Saturday' },
//                 { value: 'su', label: 'Sunday' },
//             ]} state={state} setState={setState} />
//             <InputField name="funFact" text="Fun Fact" state={state} setState={setState} />
//             <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//         </form>
//     );
// };

// export default CreateProfile;



// import React, { useState, useCallback } from 'react';
// import { useDbUpdate } from '../utilities/firebase';

// function validateField(key, value) {
//     const validators = {
//         preferredName: val => val.length >= 2 ? '' : 'Must be at least two characters',
//         // Other fields can have their validators here
//     };
//     return validators[key] ? validators[key](value) : '';
// }

// function FormField({ label, type, name, state, setState }) {
//     const onChange = (e) => {
//         const { name, value } = e.target;
//         setState(prevState => ({
//             ...prevState,
//             [name]: value,
//             errors: { ...prevState.errors, [name]: validateField(name, value) }
//         }));
//     };

//     return (
//         <div className="form-group">
//             <label htmlFor={name}>{label}</label>
//             <input
//                 type={type}
//                 className="form-control"
//                 id={name}
//                 name={name}
//                 value={state[name]}
//                 onChange={onChange}
//             />
//             {state.errors[name] && <div className="text-danger">{state.errors[name]}</div>}
//         </div>
//     );
// }

// function SelectField({ label, name, options, state, setState }) {
//     const onChange = (e) => {
//         setState({ ...state, [name]: e.target.value });
//     };

//     return (
//         <div className="form-group">
//             <label htmlFor={name}>{label}</label>
//             <select className="form-control" id={name} value={state[name]} onChange={onChange}>
//                 {options.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                 ))}
//             </select>
//         </div>
//     );
// }

// function CheckboxGroup({ label, name, options, state, setState }) {
//     const onChange = (e) => {
//         const { value, checked } = e.target;
//         setState(prevState => ({
//             ...prevState,
//             [name]: { ...prevState[name], [value]: checked }
//         }));
//     };

//     return (
//         <div className="form-group">
//             <label>{label}</label>
//             {options.map(option => (
//                 <div key={option.value} className="form-check">
//                     <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value={option.value}
//                         checked={state[name][option.value] || false}
//                         onChange={onChange}
//                     />
//                     <label className="form-check-label">
//                         {option.label}
//                     </label>
//                 </div>
//             ))}
//         </div>
//     );
// }

// function CreateProfile({ user, firstTimeUserCallBack }) {
//     const [state, setState] = useState({
//         preferredName: '',
//         sport: '',
//         gym: '',
//         expertise: '',
//         gender: '',
//         funFact: '',
//         days: {},
//         errors: {}
//     });

//     const [update, result] = useDbUpdate(`users/${user}`);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form Submitted:', state);

//         // Add additional form validation and submission logic here

//         update(state).then(() => {
//             console.log('Data successfully submitted to Firebase');
//         }).catch(error => {
//             console.error('Error submitting data to Firebase:', error);
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit} noValidate>
//             <FormField label="Preferred Name" type="text" name="preferredName" state={state} setState={setState} />
//             {/* Other FormField components can be added here */}
//             <SelectField label="Sport" name="sport" options={[
//                 { value: 'cardio', label: 'Cardio' },
//                 { value: 'StrengthTraining', label: 'Strength Training' },
//                 { value: 'GroupSports', label: 'Group sports' },
//                 { value: 'cardio', label: 'Cardio' },
//                 { value: 'cardio', label: 'Cardio' },
//                 // ... other options
//             ]} state={state} setState={setState} />
//             {/* Other SelectField components can be added here */}
//             <CheckboxGroup label="Days" name="days" options={[
//                 { value: 'monday', label: 'Monday' },
//                 // ... other options
//             ]} state={state} setState={setState} />
//             <FormField label="Fun Fact" type="text" name="funFact" state={state} setState={setState} />
//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//     );
// }

// export default CreateProfile;

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';
import "./CreateProfile.css";

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

function CreateProfile({ user, firstTimeUserCallBack }) {
    //console.log(user.uid);
    const [update] = useDbUpdate(`/users/${user.uid}/`);
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className='form-container' style={location.pathname === "/EditProfile" ? { overflow: "auto", marginTop: "250px" } : {
            overflow: "auto"
        }}>
            <form className='profile-form' onSubmit={handleSubmit} noValidate>
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
                    name="gym"
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
                        { value: 0, label: 'Beginner' },
                        { value: 1, label: 'Beg / Int' },
                        { value: 2, label: 'Int' },
                        { value: 3, label: 'Int / Adv' },
                        { value: 4, label: 'Adv' },
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
