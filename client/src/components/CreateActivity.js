import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// on submit, this form will send data to the Activities component by using it's addActivity handler;
// addActivity handler will add the activity to the activities array defined in the activities component's state.

const ActivityForm = (props) => {
  const eventToBeEdited = props.selectedEvent;
  let newData = {
    title: "",
    id: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: {},
    recurringEvent: false,
    cost: "$0",
    imageUrl: "",
    online: false,
    meetingLink: "",
    registration: "Open",
    contactEmail: "",
    tagName: "",
  };

  let currentData =
    Object.keys(eventToBeEdited).length > 0 ? eventToBeEdited : newData;

  const [data, setData] = useState(currentData);
  const [isOnline, setIsOnline] = useState(false);
  const formatDate = (date) => {};
  const formatTime = (time) => {
    let slicingIdx = time.indexOf(":");
    let hours = time.slice(0, slicingIdx);
    let minutes = time.slice(slicingIdx + 1, slicingIdx + 3);
    let newTime = "";
    if (hours === "00") {
      newTime = `12:${minutes} AM`;
    } else if (+hours < 12) {
      newTime = `${+hours}:${minutes} AM`;
    } else if (+hours === 12) {
      newTime = `12:${minutes} PM`;
    } else {
      newTime = `${+hours - 12}:${minutes} PM`;
    }
    return newTime;
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.showForm}
      onHide={props.onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {Object.keys(eventToBeEdited).length > 0
            ? eventToBeEdited.title
            : "Create New Event"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <InputGroup>
            <FormControl
              className="mb-3 mr-3 rounded"
              placeholder="Event Title"
              aria-label="title"
              aria-describedby="title"
              type="text"
              defaultValue={eventToBeEdited.title}
              onChange={(e) =>
                setData({
                  ...data,
                  title: e.target.value,
                })
              }
            />

            <DropdownButton
              id="dropdown-item-button"
              title="Registration"
              variant="primary"
            >
              <Dropdown.Item
                as="button"
                style={{
                  fontSize: "16px",
                  margin: "0",
                }}
                defaultValue={eventToBeEdited.registration}
                value="Open"
                onClick={(e) => {
                  e.preventDefault();
                  setData({
                    ...data,
                    registration: e.target.value,
                  });
                }}
              >
                Open
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                style={{
                  fontSize: "16px",
                  margin: "0",
                }}
                value="Close"
                defaultValue={eventToBeEdited.registration}
                onClick={(e) => {
                  e.preventDefault();
                  setData({
                    ...data,
                    registration: e.target.value,
                  });
                }}
              >
                Close
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
          <div className="editor" style={{ marginBottom: "15px" }}>
            <CKEditor
              editor={ClassicEditor}
              data={data.descrition}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                setData({ ...data, description: editorData });
              }}
            />
          </div>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="startDate">Start Date </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="mr-rounded"
              placeholder="Start Date"
              aria-label="start date"
              aria-describedby="start date"
              type="date"
              defaultValue={eventToBeEdited.startDate}
              onChange={(e) => {
                let year = e.target.value.slice(0, 4);
                let month = e.target.value.slice(5, 7);
                let day = e.target.value.slice(8, 10);

                setData({
                  ...data,
                  startDate: month + "/" + day + "/" + year,
                });
              }}
            />
            <InputGroup.Prepend>
              <InputGroup.Text id="startDate">End Date </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="mr-rounded"
              placeholder="End Date"
              aria-label="end date"
              aria-describedby="end date"
              type="date"
              defaultValue={eventToBeEdited.endDate}
              onChange={(e) => {
                let year = e.target.value.slice(0, 4);
                let month = e.target.value.slice(5, 7);
                let day = e.target.value.slice(8, 10);

                setData({
                  ...data,
                  endDate: month + "/" + day + "/" + year,
                });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend className="ml-rounded">
              <InputGroup.Text id="time">Starts</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className="mr-rounded"
              placeholder="Start Time"
              aria-label="start-time"
              aria-describedby="start-time"
              type="time"
              defaultValue={eventToBeEdited.startTime}
              onChange={(e) => {
                setData({
                  ...data,

                  startTime: formatTime(e.target.value),
                });
              }}
            />

            <InputGroup.Prepend className="mr-rounded">
              <InputGroup.Text id="time">Ends</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="End Time"
              aria-label="end-time"
              aria-describedby="end-time"
              type="time"
              defaultValue={eventToBeEdited.endTime}
              onChange={(e) => {
                setData({
                  ...data,

                  endTime: formatTime(e.target.value),
                });
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend className="ml-rounded">
              <InputGroup.Text id="contact">Contact Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="abc@xyz.com"
              aria-label="contact"
              aria-describedby="contact"
              type="email"
              defaultValue={eventToBeEdited.contactEmail}
              onChange={(e) => {
                setData({ ...data, contactEmail: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend className="ml-rounded">
              <InputGroup.Text id="tag">Special Tag</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Example: Free Event"
              aria-label="tag"
              aria-describedby="tag"
              type="text"
              defaultValue={eventToBeEdited.tagName}
              onChange={(e) => {
                setData({ ...data, tagName: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="Location">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>

            <FormControl
              type="text"
              placeholder="Address"
              aria-label="address"
              aria-describedby="address"
              defaultValue={
                eventToBeEdited.location ? eventToBeEdited.location.street : ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  location: { ...data.location, street: e.target.value },
                })
              }
            />
            <FormControl
              type="text"
              placeholder="City"
              aria-label="city"
              aria-describedby="city"
              defaultValue={
                eventToBeEdited.location ? eventToBeEdited.location.city : ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  location: { ...data.location, city: e.target.value },
                })
              }
            />
            <FormControl
              placeholder="State"
              aria-label="state"
              aria-describedby="state"
              type="text"
              maxLength="2"
              defaultValue={
                eventToBeEdited.location ? eventToBeEdited.location.state : ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  location: { ...data.location, state: e.target.value },
                })
              }
            />
            <FormControl
              type="text"
              placeholder="Country"
              aria-label="country"
              aria-describedby="country"
              defaultValue={
                eventToBeEdited.location ? eventToBeEdited.location.country : ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  location: { ...data.location, country: e.target.value },
                })
              }
            />
            <FormControl
              placeholder="ZIP"
              aria-label="zip"
              aria-describedby="zip"
              type="number"
              min="0"
              defaultValue={
                eventToBeEdited.location ? eventToBeEdited.location.zip : ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  location: { ...data.location, zip: e.target.value },
                })
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend className="ml-rounded">
              <InputGroup.Text id="cost">$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Cost"
              aria-label="cost"
              aria-describedby="cost"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              defaultValue={eventToBeEdited ? eventToBeEdited.cost : ""}
              onChange={(e) => setData({ ...data, cost: "$" + e.target.value })}
            />
            <InputGroup.Prepend className="mr-rounded ml-2">
              <InputGroup.Text id="imageUrl">Image URL</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Image URL"
              aria-label="image"
              aria-describedby="image"
              type="url"
              defaultValue={eventToBeEdited.imageUrl}
              onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
            />
          </InputGroup>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="online"
              checked={isOnline}
              defaultValue={eventToBeEdited.online}
              onChange={(e) => {
                setIsOnline((online) => !online);
                setData({ ...data, online: true });
              }}
            />

            <label className="form-check-label" htmlFor="recurringEvent">
              Online Event
            </label>
          </div>
          {isOnline && (
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Meeting Link"
                aria-label="meeting-link"
                aria-describedby="meeting-link"
                type="url"
                defaultValue={eventToBeEdited.meetingLink}
                onChange={(e) =>
                  setData({ ...data, meetingLink: e.target.value })
                }
              />
            </InputGroup>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={(event) => {
            let id = JSON.stringify(Math.random());
            const newData = { ...data, id: id };
            props.addActivity(newData);
            props.onCancel();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ActivityForm;
