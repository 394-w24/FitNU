import './Event.css';

const Event = ({ event }) => {

    return <div className={`card m-1 p-2`}>
        <div className="card-body">
            <h4 className="card-title">{event.title}</h4>
            <p className="card-text">{event.description}</p>
            <p className="card-text">{event.location}</p>
        </div>
        <div className="card-footer bg-transparent">{event.meets}</div>
    </div>
};

export default Event;