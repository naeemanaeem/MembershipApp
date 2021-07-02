import React, { Component } from "react";
import {Form,FormGroup,FormControl,Col,Button,Modal,ButtonToolbar,Table} from "react-bootstrap";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      amount: "",
      date: "",
      show: false,
      formdata: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  showEditModal(event) {
    this.setState({
      show: true,

      name: this.state.name.value,
      description: this.state.description.value,
      amount: this.state.amount.value,
      date: this.state.date.value
    });
  }

  hideModal() {
    this.setState({
      show: false,
      name: "",
      description: "",
      amount: "",
      date: ""
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.description]: event.target.value,
      [event.target.amount]: event.target.value,
      [event.target.date]: event.target.value
    });
  }
  handleSubmit(event) {
    const formItem = {
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date
    };

    if (
      this.state.name === "" ||
      this.state.amount === "" ||
      this.state.date === ""
    ) {
      alert("Please fill mandatory filed");
    } else {
      this.setState(prevState => ({
        formdata: prevState.formdata.concat(formItem)
      }));

      alert("form submited: ");

      this.setState({
        name: "",
        description: "",
        amount: "",
        date: ""
      });
    }
    event.preventDefault();
  }

  deleteExpense(i) {
    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });
  }

  render() {
    return (
      <div>
        <p>Welcome</p>

        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.showModal}>
            Add Expenses
          </Button>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>name</th>
                <th>description</th>
                <th>amount</th>
                <th>date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.formdata.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                  <td>
                    <Button bsStyle="warning" onClick={this.showEditModal}>
                      Update
                    </Button>
                    <Button
                      bsStyle="danger"
                      onClick={() => this.deleteExpense(i)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            {...this.props}
            show={this.state.show}
            onHide={this.hideModal}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-lg "
                className="text-center"
              >
                Add Expenses
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="Text"
                      placeholder="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="description"
                      placeholder="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="amount"
                      placeholder="amount"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="date"
                      placeholder="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={5} sm={4}>
                    <Button type="submit" bsStyle="primary">
                      Add
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }
}
export default Dashboard;