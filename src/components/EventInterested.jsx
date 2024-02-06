const EventInterested = ({ selected }) => (
    <div className="event-interested">
        <h4>Interested Events</h4>
        {
            selected.length === 0
                ? <div style={{ textAlign: "center", fontSize: "30px" }}>
                    Welcome to General View! You can find group events here. Click on a heart to show you're interested!
                </div>
                : selected.map(([event, id]) => {
                    return <li key={id}>{event.title}</li>
                })
        }
    </div>
);

export default EventInterested;