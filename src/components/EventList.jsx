import Event from './Event';
import './EventList.css';

const EventList = ({ events }) => (
    <div className="event-list">
        {Object.entries(events).map(([id, event]) => <Event key={id} event={event} />)}
    </div>
);

export default EventList