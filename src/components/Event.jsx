import './Event.css';

const Event = ({ event, selected, toggleSelected }) => {
    const isFavorited = selected.includes(event);
    const heartIconClass = isFavorited ? "bi bi-heart-fill" : "bi bi-heart";
    const heartStyle = isFavorited ? { color: 'red' } : { color: 'grey' };

    return (
        <div className="card m-1 p-2 position-relative">
            <i
                style={{ ...heartStyle, top: '10px', right: '10px' }}
                onClick={() => toggleSelected(event)}
                className={`position-absolute ${heartIconClass}`}
            ></i>
            <div className="card-body">
                <h4 className="card-title">{event.title}</h4>
                <p className="card-text">{event.description}</p>
                <p className="card-text">{event.location}</p>
            </div>
            <div className="card-footer bg-transparent">{event.meets}</div>
        </div>
    );
};

export default Event;