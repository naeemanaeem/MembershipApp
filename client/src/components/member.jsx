import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import './css_stuff/member.css';

class Member extends Component {
    
    handleEditButtonClick = (e) => {
        this.props.handleMemberEdit(this.props.member);
    }

    handleRemoveButtonClick = (e) => {
        this.props.handleMemberRemove(this.props.member);
    }

    render () {
        const name = this.props.member.Firstname + " " + this.props.member.Lastname;
        const phoneNum = this.props.member.PhoneNum;
        const address = this.props.member.HouseNo + " " + this.props.member.Street;
        const village = this.props.member.Village;   
        const membSince = this.props.member.createAt.substr(0, 10);

        let component;
        component =
             <React.Fragment>
            <tr className="border-bottom">
                <td class="center">{this.props.member.MemberId}</td>
                <td class="center">{name}</td>
                <td class="center">{phoneNum}</td>
                <td class="center">{address}</td>
                <td class="center">{village}</td>
                <td class="center">{membSince}</td>
                <td class="centerimg">
                    <Button variant="outline-warning" onClick={this.handleEditButtonClick}>edit</Button>
                    {/* <Image src="imgs/ViewInfoIcon.jpg" onClick={this.handleEditButtonClick} /> */}
                </td>
            </tr>
            </React.Fragment>
        return component;
    }
}
  
export default Member;