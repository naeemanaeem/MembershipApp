import React, { useState, useEffect } from "react";
import axios from "axios";
const MyVolunteerHours = () => {
  const [volHours, setVolHours] = useState(0);
  const [userVolunteering, setUserVolunteering] = useState([]);
  const [error, setError] = useState(null);
  const fetchVolunteerHours = async () => {
    try {
      const activities = await axios.get(
        `volunteer/volunteerByEmail/${localStorage.user_email}`
      );

      if (activities && activities.data) {
        let volunteerHours = 0;
        const volActivities = [];
        activities.data.forEach((activity) => {
          volActivities.push({
            name: activity.event,
            startDate: activity.eventId.startDateTime,
            endDate: activity.eventId.endDateTime,
            volHours: activity.selectedDateTime.length,
          });
          volunteerHours += activity.selectedDateTime.length;
        });
        setVolHours(volunteerHours);
        setUserVolunteering(volActivities);
      } else {
        throw Error("Error fetching registered activities!");
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchVolunteerHours();
  }, []);
  if (error) {
    return (
      <React.Fragment>
        <h4 className="ml-3 mt-5">NO VOLUNTEERING RECORD FOUND</h4>
        <hr class="solid mr-2" />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h5 style={{ textAlign: "end", color: "navy" }}>
          Total Volunteer Hours: &nbsp;{volHours}
        </h5>

        <ol>
          {userVolunteering.map((activity, i) => (
            <li>
              <div className="d-flex flex-row justify-content-between">
                <b>Event:</b>
                <span>{activity.name}</span>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <b>Start Date:</b>

                <span>{new Date(activity.startDate).toLocaleDateString()}</span>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <b>End Date:</b>

                <span>{new Date(activity.endDate).toLocaleDateString()}</span>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <b>Volunteer Hours:</b> <span>{activity.volHours}</span>
              </div>
              <hr />
            </li>
          ))}
        </ol>
      </React.Fragment>
    );
  }
};
export default MyVolunteerHours;
