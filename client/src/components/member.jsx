import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Member extends Component {
    
    handleEditButtonClick = (e) => {
        this.props.handleMemberEdit(this.props.member);
    }

    handleRemoveButtonClick = (e) => {
        this.props.handleMemberRemove(this.props.member);
    }

    render () {
        const address = this.props.member.HouseNo + " " + this.props.member.Street;
        const name = this.props.member.Firstname + " " + this.props.member.Lastname;
        return (
            <tr className="border-bottom">
                <td>{this.props.member.MemberId}</td>
                <td>{name}</td>
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