import React, { Component } from 'react';
export const MembersContext = React.createContext("");  //exporting context object
class MembersProvider extends Component {
    state = {
        searchText: "",
        members: []
    }

    render() {
        return (
            <MembersContext.Provider value={
                {   
                    state: this.state,
                    setSearchText: (value) => {
                        this.setState({searchText: value});
                    },
                    setStreets: (value) => {
                        this.setState({streets: value});
                    }
                }
            }>
                {this.props.children}   
            </MembersContext.Provider>
        )
    }
}

export default MembersProvider;