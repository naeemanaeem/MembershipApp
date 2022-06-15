import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Member from "./member";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Row, Col } from "reactstrap";
import Form from "react-bootstrap/Form";
import DependentEdit from "./dependentedit";
import MemberEdit from "./memberedit";
import CountrySelector from "./helper/countryselector.jsx";
import StateSelector from "./helper/stateselector.jsx";
import MyActivities from "./myactivities";
import "./css_stuff/myaccount.css";
import { Container } from "react-bootstrap";
class MyAccount extends Component {
  state = {
    modalShow: false,
    memberShow: false,
    myaccount: { Dependents: [] },
    register: {},
    tempdependent: {},
    dependents: [],
    depArrSize: 0,
    changeDepArr: false,
    error: "",
    errors: [],
  };

  //LOADS DATA INTO MYACCOUNT
  async componentDidMount() {
    try {
      const email = localStorage.user_email;

      // const res = await axios.get(`/members/${localStorage.idOfMember}`);
      const res = await axios.get(`/members/memberByEmail/${email}`);
      this.setState({ myaccount: res.data, error: "" });
    } catch (e) {
      this.setState({ error: e.message });
      console.error(e);
    }
  }

  //REGISTER NEW MEMBER
  saveNewMember = async (m) => {
    console.log("Save new member - ", m);
    if (
      m.Firstname &&
      m.Firstname.length > 0 &&
      m.Lastname &&
      m.Lastname.length > 0 &&
      m.HouseNo &&
      m.HouseNo.length > 0 &&
      m.Street &&
      m.Street.length > 0
    ) {
      let dependents = [...m.Dependents];
      m.Dependents = [];
      const res = await axios.post("/members", m);
      const member = await axios.get("/members" + res.data._id);

      if (!localStorage.idOfMember) {
        localStorage.idOfMember = res.data._id;
      }

      if (dependents.length > 0) {
        for (var i = 0; i < dependents.length; ++i) {
          dependents[i].Guardians.push(member._id);
          this.saveNewDependent(dependents[i], member);
        }
      } else {
        this.setState({ myaccount: res.data });
      }
    }
  };

  //SAVES NEW DEPENDENTS
  saveNewDependent = async (m, account) => {
    if (
      m.Firstname &&
      m.Firstname.length > 0 &&
      m.Lastname &&
      m.Lastname.length > 0 &&
      m.HouseNo &&
      m.HouseNo.length > 0 &&
      m.Street &&
      m.Street.length > 0
    ) {
      const res = await axios.post("/members", m);

      let myAccount;
      if (account) {
        myAccount = account;
      } else {
        myAccount = this.state.myaccount;
      }
      myAccount.Dependents.push(res.data);
      this.handleEditSave(myAccount, true);
    }
  };

  //SAVED UPDATED MEMBERS/DEPENDENTS
  saveUpdatedMember = async (m) => {
    try {
      await axios.put("members/" + m._id, m);
      const member = await axios.get("members/" + m._id);
      this.setState({ myaccount: member.data });
      // TODO: update with the member details returned from server?
    } catch (error) {
      console.error(error);
    }
  };

  //HANDLES SAVING EDITED MEMBERS/DEPENDENTS AND SAVING NEW DEPENDENTS
  handleEditSave = (m, isOwner) => {
    try {
      let member;
      if (isOwner) {
        member = this.state.myaccount; //SET MEMBER TO MYACCOUNT
      } else {
        member = this.state.dependents.find((el) => el._id === m._id); //SET MEMBER TO DEPENDENT
      }
      if (member) {
        //UPDATE MEMBER/DEPENDENT

        member.Firstname = m.Firstname;
        member.Lastname = m.Lastname;
        member.HouseNo = m.HouseNo;
        member.Street = m.Street;
        member.Village = m.Village;
        member.City = m.City;
        member.Postcode = m.Postcode;
        member.Country = m.Country;

        member.Gender = m.Gender;
        member.Spouse = m.Spouse;
        member.State = m.State;
        member.Voter = m.Voter;
        member.PhoneNum = m.PhoneNum;
        member.Email = m.Email;
        member.DateOfBirth = m.DateOfBirth;
        member.Relationship = m.Relationship;
        member.Guardians = m.Guardians;
        member.Dependents = m.Dependents;

        this.saveUpdatedMember(member);
        if (isOwner) {
          console.log("Update member - ", member);
          this.setState({ myaccount: member });
        } else {
          console.log("Update dependent - ", member);
          let newDep = [...this.state.dependents];
          newDep.splice(
            this.state.dependents.findIndex((el) => el._id === member._id),
            1
          );
          newDep.push(member);
          this.setState({ dependents: newDep }, this.fillDependentArray());
        }
      } else {
        //ADD NEW DEPENDENT

        console.log("Save dependent - ", m);
        m.Guardians.push(this.state.myaccount._id);
        this.saveNewDependent(m);
      }
    } catch (error) {
      console.error(error);
    }
  };

  addNewMember = () => {
    this.setState(
      {
        register: {
          Firstname: "",
          Lastname: "",
          HouseNo: "",
          Guardians: [],
          Dependents: [],
        },
      },
      this.showMemberEditDialog
    );
  };

  //SETS DEPENDENTEDIT MODAL
  setModalShow = (e) => {
    //true or false
    this.setState({ modalShow: e });
  };

  //SHOWS DEPENDENT EDIT MODAL
  showDependentEditDialog = (member) => {
    this.setState(
      {
        tempdependent: member,
      },
      this.setModalShow(true)
    );
  };

  //HIDES DEPENDENT EDIT MODAL
  hideDependentEditDialog = () => {
    this.setModalShow(false);
  };

  setMemberShow = (e) => {
    //true or false
    this.setState({ memberShow: e });
  };

  showMemberEditDialog = () => {
    this.setMemberShow(true);
  };

  hideMemberEditDialog = () => {
    this.setMemberShow(false);
  };

  //PREPARES FOR NEW DEPENDENT AND OPENS DEPENDENT MODAL
  addNewDependent = () => {
    let m = { ...this.state.myaccount };
    this.setState(
      {
        tempdependent: {
          Firstname: "",
          Lastname: "",
          HouseNo: m.HouseNo,
          Street: m.Street,
          Village: m.Village,
          City: m.City,
          State: m.State,
          Country: m.Country,
          Postcode: m.Postcode,
          Guardians: [],
        },
      },
      this.setModalShow(true)
    );
  };

  //CANCELS MEMBER EDIT
  editMemberOnCancel = (m) => {
    console.log(m);
    this.setState(
      { myaccount: m },
      this.editMember()
      // this.hideMemberEditDialog()
    );
  };
  //SAVES EDITED MEMBER
  editMemberOnSave = (m) => {
    this.editMember();
    // this.hideMemberEditDialog();
    console.log("Update member - ", m);
    this.saveUpdatedMember(m, true);
  };

  editMember = () => {
    // this.showMemberEditDialog();
    //FOR HIDING AND SHOWING SAVE AND CANCEL
    var x = document.getElementById("editing");

    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("editMemButton").style.display = "none";
    } else {
      x.style.display = "none";
      document.getElementById("editMemButton").style.display = "block";
    }

    //FOR DISABLING AND ENABLING FORM
    var y = document.getElementById("target").elements;
    for (var i = 0; i < y.length; i++) {
      if (y[i].disabled) {
        y[i].disabled = false;
      } else {
        y[i].disabled = true;
      }
    }
  };

  resetErrors = (m) => {
    this.setState({ errors: [] }, this.checkErrors(m));
  };

  checkErrors = (m) => {
    let errorArr = [];
    if (!m.Firstname) {
      errorArr.push("Enter First Name!");
    }

    if (!m.Lastname) {
      errorArr.push("Enter Last Name!");
    }

    if (!m.PhoneNum) {
      errorArr.push("Enter Phone Number!");
    } else if (m.PhoneNum.length < 10 || m.PhoneNum.length > 11) {
      errorArr.push("Invalid Phone Number!");
    }

    if (!m.Email) {
      errorArr.push("Enter Email!");
    } else if (!m.Email.includes("@")) {
      errorArr.push("Invalid Email!");
    }

    if (!m.HouseNo) {
      errorArr.push("Enter House Number!");
    }

    if (!m.Street) {
      errorArr.push("Enter Street Name!");
    }

    if (!m.City) {
      errorArr.push("Enter City Name!");
    }

    if (!m.Country) {
      errorArr.push("Select Country!");
    }

    if (!m.Postcode) {
      errorArr.push("Enter Zipcode!");
    } else if (m.Postcode.length !== 5) {
      errorArr.push("Invalid Zipcode!");
    }

    if (!m.DateOfBirth) {
      errorArr.push("Enter Date of Birth!");
    } else if (
      m.DateOfBirth.indexOf("/") !== 2 ||
      m.DateOfBirth.lastIndexOf("/") !== 5
    ) {
      errorArr.push("Invalid Date of Birth! Use format mm/dd/yyyy");
    }

    // this.state.errors = errorArr;
    this.setState({ errors: errorArr });
  };

  //CALULATES AGE OF DEPENDENT
  calulateAge = (dob) => {
    let age, month, day, year;
    // dob = "09/16/2000";
    let date = new Date();
    if (dob) {
      month = dob.slice(0, 2);
      day = dob.slice(3, 5);
      year = dob.slice(6, 11);
      age = date.getFullYear() - year;
      if (date.getMonth() + 1 - month < 1) {
        if (date.getMonth() + 1 - month === 0) {
          if (date.getDate() - day < 0) {
            age--;
          }
        } else {
          age--;
        }
      }
    } else {
      age = "Need DOB";
    }
    return age;
  };

  render() {
    let detailPage, dependentPage;

    let thisaccount = this.state.myaccount;
    var editaccount = { ...thisaccount };
    const dependent = this.state.myaccount.Dependents;
    if (
      editaccount.Firstname &&
      editaccount.Firstname === this.state.myaccount.Firstname
    ) {
      detailPage = (
        <React.Fragment>
          {/* Personal Information Below */}
          <h4 className="ml-3">
            Personal Information
            <Button id="editMemButton" variant="dark" onClick={this.editMember}>
              Edit Member
            </Button>
          </h4>
          <hr className="solid mr-2" />

          <Form id="target">
            <Row className="ml-4 mt-4">
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Firstname}
                    onChange={(e) => {
                      thisaccount.Firstname =
                        e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.DateOfBirth}
                    onChange={(e) => {
                      if (e.target.value.length > 1) {
                        if (
                          e.target.value.indexOf("/") === -1 ||
                          (e.target.value.length > 4 &&
                            !e.target.value.substr(4).includes("/"))
                        ) {
                          e.target.value += "/";
                        }
                      }
                      thisaccount.DateOfBirth =
                        e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Lastname}
                    onChange={(e) => {
                      thisaccount.Lastname = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Gender}
                    onChange={(e) => {
                      thisaccount.Gender = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    as="select"
                    disabled
                  >
                    <option>n/a</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Spouse</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Spouse}
                    className="detailSelWid"
                    onChange={(e) => {
                      thisaccount.Spouse = e.target.value.toLocaleUpperCase();
                    }}
                    as="select"
                    disabled
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Address Information Below */}
            <h4 className="ml-3">Address Information</h4>
            <hr className="solid mr-2" />
            <Row className="ml-4 mt-4">
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>House Number</Form.Label>
                  <Form.Control
                    defaultValue={this.state.myaccount.HouseNo}
                    onChange={(e) => {
                      thisaccount.HouseNo = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.City}
                    onChange={(e) => {
                      thisaccount.City = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    defaultValue={this.state.myaccount.Street}
                    onChange={(e) => {
                      thisaccount.Street = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.State}
                    onChange={(e) => {
                      thisaccount.State = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    as="select"
                    disabled
                  >
                    <StateSelector />
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Village</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Village}
                    onChange={(e) => {
                      thisaccount.Village = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    defaultValue={thisaccount.Country}
                    onChange={(e) => {
                      thisaccount.Country = e.target.value.toLocaleUpperCase();
                    }}
                    className="detailSelWid"
                    as="select"
                    disabled
                  >
                    <CountrySelector />
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Contact Info Below */}
            <h4 className="ml-3">Contact Information</h4>
            <hr class="solid mr-2" />
            <Row className="rowSpace">
              <Form.Group className="detailSpace mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={thisaccount.Email}
                  onChange={(e) => {
                    thisaccount.Email = e.target.value.toLocaleUpperCase();
                  }}
                  className="detailSelWid"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  defaultValue={thisaccount.PhoneNum}
                  onChange={(e) => {
                    thisaccount.PhoneNum = e.target.value.toLocaleUpperCase();
                  }}
                  className="detailSelWid"
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>

          {/* Member Info Below UNCOMMENT ONCE THE MEMBER TYPE AND STATUS ARE IMPLEMENTED*/}

          {/*<h4 className="ml-3">Member Information</h4>
 <hr class="solid mr-2" />
 <Row className="rowSpace">
 <Form.Group className="detailSpace mb-4">
 <Form.Label>Member Type</Form.Label>
 <Form.Control value="Paying" className="detailSelWid"/>

 </Form.Group>

 <Form.Group className="mb-4">
 <Form.Label>Member Status</Form.Label>
 <Form.Control value="Active" className="detailSelWid"/>
 </Form.Group>
 </Row>*/}

          <div id="editing" style={{ display: "none" }}>
            <hr class="dsolid mr-2" />
            <Button
              variant="dark"
              onClick={() => {
                this.resetErrors(thisaccount);
                if (this.state.errors.length > 0) {
                  let allErrors = "";
                  let error = this.state.errors;
                  for (var i = 0; i < this.state.errors.length; ++i) {
                    allErrors += error[i];
                    if (i + 1 !== this.state.errors.length) {
                      allErrors += "\n";
                    }
                  }
                  alert(allErrors);
                } else {
                  this.editMemberOnSave(thisaccount);
                }
              }}
              style={{ float: "left" }}
            >
              Save
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                this.editMemberOnCancel(editaccount);
              }}
              style={{ float: "left" }}
            >
              Cancel
            </Button>
          </div>
        </React.Fragment>
      );
    } else {
      detailPage = (
        <React.Fragment>
          <div style={{}}>
            <h4 className="ml-3">
              NO ACCOUNT FOUND
              {/* <Button id="regMemButton" variant="dark" onClick={this.editMember}>REGISTER AS MEMBER</Button> */}
            </h4>
            <hr className="solid mr-2" />
            <Button
              id="regMemButton"
              variant="dark"
              style={{ position: "fixed", left: "50%" }}
              onClick={this.addNewMember}
            >
              REGISTER AS MEMBER
            </Button>
          </div>
        </React.Fragment>
      );
    }

    if (thisaccount.Dependents.length > 0) {
      dependentPage = (
        <React.Fragment>
          <h4 className="ml-3">
            Dependents
            <Button
              variant="secondary"
              className="mb-3"
              onClick={this.addNewDependent}
            >
              Add Dependent
            </Button>
          </h4>
          <hr className="solid mr-2" />
          <Table className="mr-4 table">
            <thead>
              <tr>
                <th className="depTableHead">First Name</th>
                <th className="depTableHead">Last Name</th>
                <th className="depTableHead">Relationship</th>
                <th className="depTableHead">Age</th>
                <th className="depTableHead">View/Edit Info</th>
              </tr>
            </thead>
            <tbody>
              {dependent.map((dep) => {
                return (
                  <tr key={dep._id}>
                    <td className="tablebody">{dep.Firstname}</td>
                    <td className="tablebody">{dep.Lastname}</td>
                    <td className="tablebody">
                      {dep.Relationship ? dep.Relationship : "Relationship"}
                    </td>
                    <td className="tablebody">
                      {this.calulateAge(dep.DateOfBirth)}
                    </td>
                    <Member
                      isNewDep={false}
                      isDep={true}
                      handleMemberEdit={this.showDependentEditDialog}
                      member={dep}
                      className="tablebody"
                    />
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </React.Fragment>
      );
    } else {
      dependentPage = (
        <React.Fragment>
          <h4 className="ml-3">
            Dependents
            <Button
              variant="warning"
              className="mb-3"
              onClick={this.addNewDependent}
            >
              Add Dependent
            </Button>
          </h4>
          <hr class="solid mr-2" />
          <h2>NO DEPENDENTS</h2>
        </React.Fragment>
      );
    }

    return (
      <Container>
        <DependentEdit
          member={this.state.tempdependent}
          show={this.state.modalShow}
          onCancel={this.hideDependentEditDialog}
          onSave={this.handleEditSave}
          addDependent={this.addDependent}
          myAccount={true}
        />

        <MemberEdit
          member={this.state.register}
          show={this.state.memberShow}
          onDependentShow={this.hideMemberEditDialog}
          onDependentHide={this.showMemberEditDialog}
          onCancel={this.hideMemberEditDialog}
          onSave={this.saveNewMember}
          myAccount={false}
          registerMember={true}
        />

        <div>
          <h1 className="header">My Account</h1>
        </div>
        <div>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="details"
            className="w-50"
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="details">My Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="dependents">My Dependents</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="activities">My Activities</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content className="outline">
                  <Tab.Pane eventKey="details">{detailPage}</Tab.Pane>
                  <Tab.Pane eventKey="dependents">{dependentPage}</Tab.Pane>
                  <Tab.Pane eventKey="activities">{<MyActivities />}</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Container>
    );
  }
}

export default MyAccount;
