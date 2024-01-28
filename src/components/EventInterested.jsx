const EventInterested = ({ selected }) => (
    <div className="event-interested">
        <h4>Interested Events</h4>
        {
            selected.length === 0
                ? <p>No events have been selected. Click on a heart to show you're interested!</p>
                : Object.entries(selected).map(([id, event]) => {
                    return <li key={id}>{event.title}</li>
                })
        }
    </div>
);

export default EventInterested;