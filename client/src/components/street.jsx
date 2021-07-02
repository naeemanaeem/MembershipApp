import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Member from './member';
import { SearchTextContext } from './searchtextprovider';

class Street extends Component {

    handleAddButtonClick = (e) => {
        this.props.addMember(this.props.street);
    }

    handleMemberEdit = (m) => {
        this.props.updateMember(m);
    }

    handleMemberRemove = (m) => {
        this.props.removeMember(m);
    }

    render () {
        return (
            <React.Fragment> 
            <tr className="border-bottom border-success font-weight-bold">
                <td colSpan="3">{this.props.street.name + '  '}
                </td>
                <td>
                    <Button variant="outline-warning" onClick={this.handleAddButtonClick}>+</Button>
                </td>
            </tr>
            {this.props.street.members.map((member) => {

                let searchText = "";
                <SearchTextContext.Consumer>
                  {(context) => {
                     searchText =  context.state.searchText;
                     console.log("searchText to use - " +  searchText);
                   }
                  }
                </SearchTextContext.Consumer>

                return (
                    <Member 
                        key={member.MemberId} 
                        member={member} 
                        handleMemberEdit={this.handleMemberEdit}
                        handleMemberRemove={this.handleMemberRemove}
                    />
                );
            })}

            <tr><td></td><td></td><td></td></tr>
            <tr><td colSpan="3"></td></tr>

            </React.Fragment> 
        );
    }
}
  
export default Street;