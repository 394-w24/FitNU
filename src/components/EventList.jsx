import Event from './Event';
import './EventList.css';
import { useState } from 'react';


const EventList = ({ events }) => {
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => setSelected(
        selected.includes(item)
            ? selected.filter(x => x !== item)
            : [...selected, item]
    );

    return (
        <div className="event-list">
            {Object.entries(events).map(([id, event]) => <Event key={id} event={event} selected={selected} toggleSelected={toggleSelected} />)}
        </div>
        // <ProductList products={products} selected={selected} toggleSelected={toggleSelected} />
    );

};

export default EventList