import React, { useState, useEffect } from "react";
import axios from "axios";
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            border: "2px solid grey",
            borderBottom: "2px solid grey",

            height: "80px",
            backgroundColor: "silver",
          }}
        >
          <h4 style={{ fontWeight: "bolder" }}>Upcoming Events</h4>

          <h4 style={{ paddingLeft: "50px", fontWeight: "bolder" }}>
            Upcoming Volunteer Events
          </h4>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              borderTop: "2px solid grey",
              borderLeft: "2px solid grey",
              borderRight: "2px solid grey",
            }}
          >
            <div style={{ width: "50%", backgroundColor: "lightcyan" }}>
              {userActivities.map((activity) => (
                <div
                  style={{
                    height: "40px",
                    // border: "1px solid grey",
                    borderBottom: "2px solid grey",
                    borderRight: "1px solid grey",
                    padding: "10px",
                    textAlign: "start",
                    // marginRight: "1px",
                  }}
                >
                  {activity}
                </div>
              ))}
            </div>
            <div style={{ width: "50%", backgroundColor: "white" }}>
              {userVolunteering.map((volunteering) => (
                <div
                  style={{
                    height: "80px",
                    borderBottom: "2px solid grey",
                    borderLeft: "2px solid grey",
                    padding: "10px",
                    textAlign: "start",
                  }}
                >
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
          <div
            style={{
              width: "100%",
              backgroundColor: "black",
              height: "50px",
              marginTop: "-2px",
              position: "absolute",
              zIndex: "1",
            }}
          ></div>
        </div>
      </React.Fragment>
    );
  }
};

export default MyActivities;
