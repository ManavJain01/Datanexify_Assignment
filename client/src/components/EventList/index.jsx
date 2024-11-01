import { format } from "date-fns";
import classes from "./style.module.css";
import PropTypes from "prop-types";

const formatDateTime = (dateTime) => {
  return format(dateTime, "do MMM yyyy h:m aaa");
};

const EventList = ({ events }) => {
  const eventsRows = events.map((e) => {
    const start = e.start.dateTime
      ? formatDateTime(e.start.dateTime)
      : formatDateTime(e.start.date);
    const end = e.end.dateTime
      ? formatDateTime(e.end.dateTime)
      : formatDateTime(e.end.date);
    return (
      <tr className={classes.tr} key={e.id}>
        <td style={{ padding: "10px 0" }}>{e.summary}</td>
        <td>{start}</td>
        <td>{end}</td>
      </tr>
    );
  });
  return (
    <article style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", gap: "10px" }}>
      <h2 style={{ textDecoration: "underline" }}>Events</h2>
      <table className={classes["events-table"]}>
        <thead>
          <tr className={classes.tr}>
            <th style={{ padding: "10px 30px" }}>Summary</th>
            <th style={{ padding: "10px 50px" }}>Start</th>
            <th style={{ padding: "10px 50px" }}>End</th>
          </tr>
        </thead>
        <tbody>{eventsRows}</tbody>
      </table>
    </article>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default EventList;
