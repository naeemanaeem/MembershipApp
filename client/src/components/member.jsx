import React, { Component } from 'react';
import './css_stuff/member.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import icon from './imgs/ViewInfoIcon.jpg'

class Member extends Component {
    
    handleEditButtonClick = (e) => {
        this.props.handleMemberEdit(this.props.member);
    }

    handleRemoveButtonClick = (e) => {
        this.props.handleMemberRemove(this.props.member);
    }

    render () {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              View Member Info
            </Tooltip>
          );

        let component;
        component =
             <React.Fragment>
                <td class="centerimg">
                <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}>
                    <img src={icon} onClick={this.handleEditButtonClick} className="pointer image centerimg" alt="View Member"/>
                </OverlayTrigger>
                </td>
            </React.Fragment>
        return component;
    }
}
  
export default Member;