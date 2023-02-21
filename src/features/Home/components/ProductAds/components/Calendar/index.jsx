import { Box } from "@mui/system";
import { calendarApi } from "api";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import "./styles.scss";

Calendar.propTypes = {};

function Calendar(props) {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendar = async () => {
      const calendars = await calendarApi.getAll();
      setCalendars(calendars);
    };
    fetchCalendar();
  }, []);

  return (
    <Box>
      <div className="calendar">
        {calendars.map((calendar) => (
          <>
            <div className="calendar__header">
              <h3>{calendar.today}</h3>
            </div>
            <div className="calendar__content">
              <h1>
                <Moment format="DD">{calendar.date}</Moment>
              </h1>
            </div>
          </>
        ))}
      </div>
    </Box>
  );
}

export default Calendar;
