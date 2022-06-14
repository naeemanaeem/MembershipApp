// Navigation.jsx
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { SearchTextContext } from "./searchtextprovider";
import { NavDropdown } from "react-bootstrap";

const Navigation = (props) => {
  const [searchText, setSearchText] = useState("");
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/">Masjid Membership</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/myaccount">
            <Nav.Link href="/myaccount">My Account</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/payment">
            <Nav.Link href="/payment">Payment</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Activities" id="activities">
            {/* <NavDropdown.Item href="/activities">Internal</NavDropdown.Item>
              <NavDropdown.Item href="/activities/external">
                External
              </NavDropdown.Item> */}
            <NavDropdown.Item>
              <LinkContainer to="/activities">
                <Nav.Link href="/activities">Internal</Nav.Link>
              </LinkContainer>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <LinkContainer to="/activities/external">
                <Nav.Link href="/activities/external">External</Nav.Link>
              </LinkContainer>
            </NavDropdown.Item>
          </NavDropdown>
          <LinkContainer to="/members">
            <Nav.Link href="/members">Members</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/printout">
              <Nav.Link href="/printout">Membership Roll</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/export">
              <Nav.Link href="/export">Export</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/volunteer">
              <Nav.Link href="/volunteer">Volunteer</Nav.Link>
            </LinkContainer> */}
        </Nav>

        <Nav>
          <LinkContainer to="/login">
            <Nav.Link href="/login">{props.loginStr}</Nav.Link>
          </LinkContainer>
        </Nav>

        {/* <SearchTextContext.Consumer>
          {(context) => (
            <Form inline>
              <FormControl
                type="text"
                placeholder="search"
                className="mr-sm-2"
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                    context.setSearchText(searchText);
                  }
                }}
              />
              <Button
                variant="outline-success"
                onClick={() => {
                  context.setSearchText(searchText);
                }}
              >
                search
              </Button>
            </Form>
          )}
        </SearchTextContext.Consumer> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
