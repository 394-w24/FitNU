import './Event.css';

const Event = ({ event, index, selected, toggleSelected }) => {
    const isFavorited = selected.some(([selevent, index]) => selevent.id === event.id);
    const heartIconClass = isFavorited ? "bi bi-heart-fill" : "bi bi-heart";
    const heartStyle = isFavorited ? { color: 'red' } : { color: 'grey' };

    // const found = selected.find(([selevent, index]) => selevent.id === event.id) || [undefined, undefined];
    // const [ev, id] = found;


    console.log("EVENT ID IS: ", index);

    return (
        <div className="card m-1 p-2 position-relative">
            <i
                style={{ ...heartStyle, top: '10px', right: '10px' }}
                onClick={() => toggleSelected(event, index)}
                className={`position-absolute ${heartIconClass}`}
            ></i>
            <div className="card-body">
                <h4 className="card-title">{event.title}</h4>
                <p className="card-text">{event.desc}</p>
                <p className="card-text">{event.location}</p>
            </div>
            <div className="card-footer bg-transparent">{event.date}</div>
        </div>
    );
};

export default Event;