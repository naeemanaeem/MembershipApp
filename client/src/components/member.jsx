import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table'

class Member extends Component {
    
    handleEditButtonClick = (e) => {
        this.props.handleMemberEdit(this.props.member);
    }

    handleRemoveButtonClick = (e) => {
        this.props.handleMemberRemove(this.props.member);
    }

    render () {
        const address = this.props.member.HouseNo + " " + this.props.member.Street + " " + this.props.member.City; //+ ", " + this.props.member.State + " " + this.props.member.Postcode;
        const village = this.props.member.Village;
        const name = this.props.member.Firstname + " " + this.props.member.Lastname;   
        const voter = "Voter: " + this.props.member.Voter;
        const membSince = this.props.member.createAt.substr(0, 10);
        const phoneNum = "Number: " + this.props.member.PhoneNum;

        return (
            // <React.Fragment>
            <tr className="border-bottom">
                <td>{this.props.member.MemberId}</td>
                <td>{name}</td>
                <td>{phoneNum}</td>
                <td>{voter}</td>
                <td>{membSince}</td>
                <td>{village}</td>
                <td>{address}</td>
                <td><ButtonGroup size="sm">
                        <Button variant="outline-warning" onClick={this.handleEditButtonClick}>e</Button>
                        <Button variant="outline-danger" onClick={this.handleRemoveButtonClick}>r</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}
  
export default Member;