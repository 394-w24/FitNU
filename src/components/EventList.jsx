import Event from './Event';
import './EventList.css';


const EventList = ({ events, selected, toggleSelected }) => {

    return (
        <div className="event-list">
            {Object.entries(events).map(([id, event]) => <Event key={id} event={event} selected={selected} toggleSelected={toggleSelected} />)}
        </div>
        // <ProductList products={products} selected={selected} toggleSelected={toggleSelected} />
    );

};

export default EventList