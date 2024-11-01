import EventList from "../EventList";
import EventFormModal from "../EventFormModal";
import { useState } from "react";
import { useEvents } from "../../hooks";
const EventDashboard = () => {
  const [events, setEvents] = useEvents();
  const [isOpenEventForm, setIsOpenEventForm] = useState(false);
  const setIsOpenEventFormFalse = () => setIsOpenEventForm(false);

  const handleAddNewEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleCreateEventBtnClick = () => {
    setIsOpenEventForm(true);
  };

  return (
    <div>
      <button onClick={handleCreateEventBtnClick} type="button" style={{ backgroundColor: "green", color: "white", padding: '10px 50px', border: 'none', borderRadius: "20px", cursor: "pointer" }}>
        Create New Event
      </button>
      <EventFormModal
        onClose={setIsOpenEventFormFalse}
        isOpen={isOpenEventForm}
        onAddNewEvent={handleAddNewEvent}
      />
      <EventList events={events} />
    </div>
  );
};

export default EventDashboard;
