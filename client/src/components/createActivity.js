import React, { useState } from "react";
import {
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import classes from "./createActivity.module.css";

const ActivityForm = (props) => {
  /* State and constants
   *************************** */

  // const intervalRef = useRef();

  const eventToBeEdited = props.selectedEvent;
  const currentData =
    Object.keys(eventToBeEdited).length > 0 ? eventToBeEdited : {};
  const errors = {
    title: "",
    description: "",
    startDateTime: "",
    contactEmail: "",
    imageUrl: "",
  };
  const [data, setData] = useState(currentData);
  const [isOnline, setIsOnline] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [formErrors, setErrors] = useState(errors);
  const minDate = moment(new Date()).format("YYYY-MM-DDTHH:MM");
  const maxDate = data.startDateTime;
  let startInt = data.startInterval ? data.startInterval : [];
  let endInt = data.endInterval ? data.endInterval : [];
  let volunteerSlots =
    data.volunteerSlots?.length > 0 ? data.volunteerSlots : [];
  const [startInterval, setStartInterval] = useState(startInt);
  const [endInterval, setEndInterval] = useState(endInt);
  const [volunteeringSlots, setVolunteeringSlots] = useState(volunteerSlots);
  const RenderInterval = (i) => {
    return (
      <Form.Group className="mb-3" controlId="formGroupDateTime" id={i}>
        <Row style={{ justifyContent: "center" }}>
          <Col>
            <Form.Label className="mt-3">Start Interval</Form.Label>

            <Form.Control
              className="rounded"
              aria-label="start interval"
              aria-describedby="start interval"
              type="datetime-local"
              min={minDate}
              required
              onChange={(e) => {
                let updatedStartInterval = [...startInterval];
                updatedStartInterval.splice(i, 1, e.target.value);
                setStartInterval(updatedStartInterval);
              }}
            />
          </Col>

          <Col>
            <Form.Label className="mt-3">End Interval</Form.Label>

            <Form.Control
              className="rounded"
              aria-label="end interval"
              aria-describedby="end interval"
              type="datetime-local"
              min={minDate}
              required
              onChange={(e) => {
                let updatedEndInterval = [...endInterval];
                updatedEndInterval.splice(i, 1, e.target.value);
                setEndInterval(updatedEndInterval);
              }}
            />
          </Col>

          <Col>
            <Form.Label className="mt-3">Slots</Form.Label>
            <Form.Control
              className="rounded"
              aria-label="slots available"
              aria-describedby="volunteering slots"
              type="number"
              min="1"
              required
              onChange={(e) => {
                let updatedSlots = [...volunteeringSlots];
                updatedSlots.splice(i, 1, Number(e.target.value));
                setVolunteeringSlots(updatedSlots);
              }}
            />
          </Col>

          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-x-square-fill"
              viewBox="0 0 16 16"
              onClick={() => removeInterval(i)}
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
            </svg>
          </Col>
        </Row>
        <hr></hr>
      </Form.Group>
    );
  };

  let renderedIntervals = data.startInterval?.map((item, i) => RenderInterval);
  const [intervals, setIntervals] = useState(
    renderedIntervals ? renderedIntervals : [RenderInterval]
  );

  const addInterval = () => {
    setIntervals([...intervals, RenderInterval]);
  };

  const removeInterval = (id) => {
    let renderIntervals = [...intervals];
    renderIntervals.splice(id, 1);
    setIntervals(renderIntervals);
  };

  const validEmail = (val) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);
  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const findFormErrors = () => {
    const { title, description, startDateTime, contactEmail, imageUrl } = data;
    const newErrors = {};
    // title errors
    if (!title || title === "") newErrors.title = "Title cannot be blank!";
    else if (title.length > 20) newErrors.title = "Title is too long!";
    // description errors
    if (!description || description === "")
      newErrors.description = "Some event description is required!";
    // startDateTime errors
    if (!startDateTime || startDateTime === "")
      newErrors.startDateTime = "Start date and time is required!";
    // contactEmail errors
    if (!contactEmail || contactEmail === "")
      newErrors.contactEmail = "Email cannot be blank!";
    else if (validEmail(contactEmail) === false)
      newErrors.contactEmail = "Invalid Email address!";
    // imageUrl errors
    if (imageUrl && validURL(imageUrl.toString()) === false)
      newErrors.imageUrl = "Invalid URL!";
    return newErrors;
  };

  /************************************/

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.showForm}
      onHide={props.onCancel}
    >
      <div className="container">
        <div className="wrapper">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {Object.keys(eventToBeEdited).length > 0
                ? eventToBeEdited.title
                : "Create New Event"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={() => {}}>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Row>
                  <Col className="col-7">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      placeholder="Enter Event Title"
                      aria-label="title"
                      aria-describedby="title"
                      type="text"
                      maxLength="20"
                      defaultValue={eventToBeEdited.title}
                      onChange={(e) => {
                        setData({
                          ...data,
                          title: e.target.value,
                        });
                        if (!!formErrors.title)
                          setErrors({
                            ...formErrors,
                            title: null,
                          });
                      }}
                      isInvalid={!!formErrors.title}
                    />
                    <Form.Text className="text-muted">
                      Title must be unique. Max Allowed: 20 characters including
                      spaces.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.title}
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label className="mt-4 "></Form.Label>
                    <DropdownButton
                      id="dropdown-item-button"
                      title="Registration"
                      variant="primary"
                    >
                      <Dropdown.Item
                        as="button"
                        className={classes.dropdown}
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
                        selected
                        className={classes.dropdown}
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
                  </Col>
                </Row>
              </Form.Group>
              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label className="mt-3 ">Event Details</Form.Label>

                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!");
                    if (eventToBeEdited.description) {
                      editor.setData(
                        decodeURIComponent(eventToBeEdited.description)
                      );
                    } else {
                      editor.setData("");
                    }
                  }}
                  onChange={(event, editor) => {
                    let srcArray = [
                      ...new DOMParser()
                        .parseFromString(editor.getData(), "text/html")
                        .querySelectorAll("img"),
                    ].map((img) => img.getAttribute("src"));
                    const editorData = encodeURIComponent(editor.getData());
                    setData({
                      ...data,
                      description: editorData,
                      imageSrc: srcArray,
                    });

                    if (!!formErrors.description)
                      setErrors({
                        ...formErrors,
                        description: null,
                      });
                  }}
                  onError={(error, details) => {
                    console.log("error: ", details, details.phase);
                    details.willEditorRestart = true;
                  }}
                  config={{
                    ckfinder: {
                      uploadUrl: "/upload",
                    },
                  }}
                />

                <Form.Text className="text-muted">
                  Images might need resizing for proper display in the event
                  detail page.
                </Form.Text>
                <Form.Control
                  isInvalid={!!formErrors.description}
                  className={classes.invalidInput}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupDatetime">
                <Row>
                  <Col>
                    <Form.Label className="mt-3">
                      Start Date And Time
                    </Form.Label>

                    <Form.Control
                      className="rounded"
                      aria-label="start datetime"
                      aria-describedby="start datetime"
                      type="datetime-local"
                      min={minDate}
                      required
                      onChange={(e) => {
                        setData({
                          ...data,
                          startDateTime: e.target.value,
                          endDateTime: e.target.value,
                        });
                        if (!!formErrors.startDateTime)
                          setErrors({
                            ...formErrors,
                            startDateTime: null,
                          });
                      }}
                      isInvalid={!!formErrors.startDateTime}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.startDateTime}
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label className="mt-3">End Date and Time</Form.Label>
                    <Form.Control
                      className="rounded"
                      aria-label="end datetime"
                      aria-describedby="end datetime"
                      type="datetime-local"
                      min={maxDate}
                      onChange={(e) => {
                        setData({
                          ...data,
                          endDateTime: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupContactEmail">
                <Form.Label className="mt-3 ">Contact Email</Form.Label>

                <Form.Control
                  placeholder="name@example.com"
                  aria-label="contact email"
                  aria-describedby="contact email"
                  type="email"
                  defaultValue={eventToBeEdited.contactEmail}
                  onChange={(e) => {
                    setData({ ...data, contactEmail: e.target.value });
                    if (!!formErrors.contactEmail)
                      setErrors({
                        ...formErrors,
                        contactEmail: null,
                      });
                  }}
                  isInvalid={!!formErrors.contactEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.contactEmail}
                </Form.Control.Feedback>
              </Form.Group>
              <hr></hr>

              <Form.Group className="mb-3" controlId="formGroupTags">
                <Form.Label className="mt-3">Special Tag(s)</Form.Label>

                <Form.Control
                  placeholder="Example: Tag1, Tag2, Tag3... (Max Allowed: 4)"
                  aria-label="tags"
                  aria-describedby="tags"
                  type="text"
                  defaultValue={eventToBeEdited.tags}
                  onChange={(e) => {
                    setData({ ...data, tags: e.target.value });
                  }}
                />

                <Form.Text className="text-muted">
                  Multiple Tags can be entered as comma separated values.
                  Example: Tag1, Tag2, Tag3... Max Allowed: 4
                </Form.Text>
              </Form.Group>
              <hr></hr>

              <Form.Group className="mb-3" controlId="formGroupAddress">
                <Form.Label className="mt-3">
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
                  Location
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  aria-label="street address"
                  aria-describedby="street address"
                  defaultValue={
                    eventToBeEdited.location
                      ? eventToBeEdited.location.street
                      : ""
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      location: {
                        ...data.location,
                        street: e.target.value,
                      },
                    })
                  }
                />

                <Row>
                  <Col>
                    <Form.Label className="mt-3">City</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="City"
                      aria-label="city"
                      aria-describedby="city"
                      defaultValue={
                        eventToBeEdited.location
                          ? eventToBeEdited.location.city
                          : ""
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          location: {
                            ...data.location,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label className="mt-3">State</Form.Label>

                    <Form.Control
                      placeholder="State"
                      aria-label="state"
                      aria-describedby="state"
                      type="text"
                      maxLength="2"
                      defaultValue={
                        eventToBeEdited.location
                          ? eventToBeEdited.location.state
                          : ""
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          location: {
                            ...data.location,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>

                  <Col>
                    <Form.Label className="mt-3">Country</Form.Label>

                    <FormControl
                      type="text"
                      placeholder="Country"
                      aria-label="country"
                      aria-describedby="country"
                      defaultValue={
                        eventToBeEdited.location
                          ? eventToBeEdited.location.country
                          : ""
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          location: {
                            ...data.location,
                            country: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label className=" mt-3">Zip Code</Form.Label>

                    <FormControl
                      placeholder="ZIP"
                      aria-label="zip"
                      aria-describedby="zip"
                      type="text"
                      defaultValue={
                        eventToBeEdited.location
                          ? eventToBeEdited.location.zip
                          : ""
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          location: { ...data.location, zip: e.target.value },
                        })
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
              <hr></hr>

              <Form.Group className="mb-3" controlId="formGroupCost">
                <Form.Label className="mt-3">Event Cost</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend className="ml-rounded">
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>

                  <FormControl
                    placeholder="Cost"
                    aria-label="cost"
                    aria-describedby="cost"
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    defaultValue={
                      eventToBeEdited ? eventToBeEdited.cost / 100 + ".00" : ""
                    }
                    onChange={(e) => setData({ ...data, cost: e.target.value })}
                  />
                </InputGroup>
              </Form.Group>
              <hr></hr>

              <Form.Group className="mb-3" controlId="formGroupImageUrl">
                <Form.Label className="mt-3">Image URL</Form.Label>

                <Form.Control
                  placeholder="Image URL"
                  aria-label="image url"
                  aria-describedby="image url"
                  type="url"
                  defaultValue={eventToBeEdited.imageUrl}
                  onChange={(e) => {
                    setData({
                      ...data,
                      imageUrl: e.target.value
                        ? e.target.value
                        : "https://mhma.info/wp-content/uploads/2021/07/MHMA-logo-1-1024x410.png",
                    });
                    if (!!formErrors.imageUrl)
                      setErrors({
                        ...formErrors,
                        imageUrl: null,
                      });
                  }}
                  isInvalid={!!formErrors.imageUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.imageUrl}
                </Form.Control.Feedback>
              </Form.Group>

              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupOnline">
                <div className="mb-3 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isOnline}
                    defaultValue={eventToBeEdited.online}
                    onChange={(e) => {
                      setIsOnline((online) => !online);
                      setData({ ...data, online: true });
                    }}
                  />

                  <label
                    className={`form-check-label ${classes.formCheckLabel}`}
                    htmlFor="onlineEvent"
                  >
                    Online Event
                  </label>
                </div>
              </Form.Group>

              {isOnline && (
                <Form.Group className="mb-3" controlId="formGroupMeetinglink">
                  <Form.Control
                    placeholder="Meeting Link"
                    aria-label="meeting-link"
                    aria-describedby="meeting-link"
                    type="url"
                    defaultValue={eventToBeEdited.meetingLink}
                    onChange={(e) =>
                      setData({ ...data, meetingLink: e.target.value })
                    }
                  />

                  <Form.Text className="text-muted">
                    Enter meeting link or URL. Meeting ID, if required, can be
                    provided in the event detail
                  </Form.Text>
                </Form.Group>
              )}
              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupImageUrl">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue={eventToBeEdited.isRecurring}
                    onChange={(e) => {
                      setData({ ...data, isRecurring: e.target.checked });
                    }}
                  />

                  <label
                    className={`form-check-label ${classes.formCheckLabel}`}
                    htmlFor="recurringEvent"
                  >
                    Recurring Event
                  </label>
                </div>
              </Form.Group>
              <hr></hr>

              <Form.Group className="mb-3" controlId="formGroupVolunteer">
                <div className="mb-3 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isVolunteer}
                    defaultValue={eventToBeEdited.isVolunteer}
                    onChange={(e) => {
                      setIsVolunteer((state) => !state);
                      setData({ ...data, isVolunteer: true });
                    }}
                  />

                  <label
                    className={`form-check-label ${classes.formCheckLabel}`}
                    htmlFor="volunteerEvent"
                  >
                    Need Volunteers?
                  </label>
                </div>
              </Form.Group>

              {isVolunteer && (
                <React.Fragment>
                  <Form.Label className="mt-3">
                    Add Volunteer Intervals
                  </Form.Label>

                  <Button
                    className={classes.addDateTime}
                    onClick={() => addInterval()}
                  >
                    Add Interval
                  </Button>

                  <hr></hr>
                  <div>
                    {intervals.map((item, i) => {
                      return item(i);
                    })}
                  </div>
                </React.Fragment>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setData({});
                props.onCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(event) => {
                const newErrors = findFormErrors();
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  alert("Please correct erros in your form entries!");
                } else {
                  let updatedData = {
                    ...data,
                    startInterval: startInterval,
                    endInterval: endInterval,
                    volunteerSlots: volunteeringSlots,
                  };

                  if (Object.keys(eventToBeEdited).length > 0) {
                    axios
                      .patch(`/activities/${eventToBeEdited._id}`, updatedData)
                      .then((res) => {
                        alert(
                          `The Event "${eventToBeEdited.title}" has been updated!`
                        );
                        props.editActivity(res.data._id, res.data);

                        props.onCancel();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    axios
                      .post("/activities", updatedData)
                      .then((res) => {
                        alert(
                          `The Event "${res.data.title}" has been created successively!`
                        );

                        props.addActivity(res.data);
                        props.onCancel();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                  setData({});
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};
ActivityForm.propTypes = {
  selectedEvent: PropTypes.object,
  showForm: PropTypes.bool,
  addActivity: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ActivityForm;
