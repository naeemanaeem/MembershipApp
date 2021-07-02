import React, { Component } from 'react';
export const SearchTextContext = React.createContext("");  //exporting context object

class SearchTextProvider extends Component {
    state = {searchText: ""}

    render() {
        return (
            <SearchTextContext.Provider value={
                {   
                    state: this.state,
                    setSearchText: (value) => {
                        console.log("setSearchText - " +  value);
                        this.setState({ searchText: value});
                    }
                }
            }>
                {this.props.children}   
            </SearchTextContext.Provider>
        )
    }
}

export default SearchTextProvider;