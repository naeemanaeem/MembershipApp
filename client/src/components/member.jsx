import React, { Component } from 'react';
import './css_stuff/member.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import icon from './imgs/ViewInfoIcon.jpg'
import Button from 'react-bootstrap/Button';

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

        const renderDepETooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              View/Edit
            </Tooltip>
          );
        
        const renderDepRTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              Remove Dependent
            </Tooltip>
          );

        let component;
        if(!this.props.isNewDep){
            component = 
                <React.Fragment>
                    <td class="centerimg">
                    <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(this.props.isDep) ? renderDepETooltip : renderTooltip}>
                        <img src={icon} onClick={this.handleEditButtonClick} className="pointer image centerimg" alt="View Member"/>
                    </OverlayTrigger>
                    </td>
                </React.Fragment>
        }
        else{
            component =
            <React.Fragment>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderDepETooltip}>
                  <Button size="sm" variant="outline-success" onClick={this.handleEditButtonClick}>EDIT</Button>
              </OverlayTrigger>

              <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderDepRTooltip}>
                  <Button size="sm" variant="outline-danger" onClick={this.handleRemoveButtonClick}>Remove</Button>
              </OverlayTrigger>
            </React.Fragment>
        }
        return component;
    }
}
  
export default Member;