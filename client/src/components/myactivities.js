import React, { useState, useEffect } from "react";
import axios from "axios";
import Classes from "./myactivities.module.css";

const MyActivities = () => {
  const [userActivities, setUserActivities] = useState([]);
  const [userVolunteering, setUserVolunteering] = useState([]);
  const [error, setError] = useState(null);
  const fetchMemberActivites = async () => {
    // fetch all the activities the user has registered for.
    try {
      const activities = await axios.get(
        `/activities/registration-info/by-google-id`
      );
      if (activities && activities.data) {
        const registeredActivities = [];
        activities.data.forEach((activity) => {
          // filter any activity that has ended
          const date = new Date().toISOString();
          if (activity.activityId.endDateTime >= date) {
            registeredActivities.push(activity.activityId.title);
          }
        });
        setUserActivities([...new Set(registeredActivities)]);
      } else {
        throw Error("Error fetching registered activities!");
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
    }
  };
  const fetchVolunteerActivities = async () => {
    try {
      const activities = await axios.get(
        `volunteer/volunteerByEmail/${localStorage.user_email}`
      );

      if (activities && activities.data) {
        const volunteerActivities = [];
        activities.data.forEach((activity) => {
          volunteerActivities.push({
            name: activity.event,
            volunteerHours: activity.selectedDateTime.length,
          });
        });

        setUserVolunteering([...volunteerActivities]);
      } else {
        throw Error("Error fetching registered activities!");
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchMemberActivites();
    fetchVolunteerActivities();
  }, []);
  if (error) {
    return (
      <React.Fragment>
        <h4 className="ml-3 mt-5">NO ACTIVITIES FOUND</h4>
        <hr class="solid mr-2" />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className={Classes.table}>
          <h4 className={Classes.thead1}>Upcoming Events</h4>

          <h4 className={Classes.thead2}>Upcoming Volunteer Events</h4>
        </div>

        <div className={Classes.tbody}>
          <div className={Classes.tbodyContent}>
            <div className={Classes.trowActivities}>
              {userActivities.map((activity) => (
                <div className={Classes.tdataActivities}>{activity}</div>
              ))}
            </div>
            <div className={Classes.trowVolunteer}>
              {userVolunteering.map((volunteering) => (
                <div className={Classes.tdataVolunteer}>
                  <div>
                    <strong>Event:</strong>&nbsp;&nbsp; {volunteering.name}
                  </div>
                  <div>
                    <strong>Volunteer Hours:</strong>&nbsp;&nbsp;
                    {volunteering.volunteerHours}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={Classes.tfoot}></div>
        </div>
      </React.Fragment>
    );
  }
};

export default MyActivities;
