const EventInterested = ({ selected }) => {
    console.log("in event interested: ", selected);

    return (
        <div className="event-interested">
            <h4>Interested Events</h4>
            {
                selected.length === 0
                    ? <div style={{ textAlign: "center", fontSize: "15px" }}>
                        No interested events!
                    </div>
                    : selected.map(([event, id]) => {
                        return <li key={id}>{event.title}</li>
                    })
            }
        </div>
    );
};

export default EventInterested;