import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

const ExternalActivityForm = (props) => {
  /* State and constants
   *************************** */

  const errors = {
    title: "",
    url: "",
  };
  const [data, setData] = useState({ title: "", url: "" });
  const [formErrors, setErrors] = useState(errors);
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
    const { title, url } = data;
    const newErrors = {};
    // title errors
    if (!title || title === "") newErrors.title = "Title cannot be blank!";

    // imageUrl errors
    if (url && validURL(url.toString()) === false)
      newErrors.url = "Invalid URL!";
    else if (!url || url === "")
      newErrors.url = "Please enter a redirect url for the event description";
    return newErrors;
  };
  /************************************/

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.showForm}
      onHide={props.onCancel}
    >
      <div className="container">
        <div className="wrapper">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create New Event
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

                    <Form.Control.Feedback type="invalid">
                      {formErrors.title}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <hr></hr>
              <Form.Group className="mb-3" controlId="formGroupRedirectLink">
                <Row>
                  <Col>
                    <Form.Label className="mt-3 ">Description Link</Form.Label>

                    <Form.Control
                      placeholder="Redirect url"
                      aria-label="Redirect link"
                      aria-describedby="Redirect link"
                      type="url"
                      onChange={(e) => {
                        setData({
                          ...data,
                          url: e.target.value,
                        });
                        if (!!formErrors.url)
                          setErrors({
                            ...formErrors,
                            url: null,
                          });
                      }}
                      isInvalid={!!formErrors.url}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.url}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <hr></hr>
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
                  axios
                    .post("/activities/external", data)
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
ExternalActivityForm.propTypes = {
  showForm: PropTypes.bool,
  addActivity: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ExternalActivityForm;
