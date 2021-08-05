import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import React, { Component } from 'react';

class VerticalTabs extends Component{
render(){
return(
    <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList>
            <Tab tabFor="vertical-tab-one">In Progress</Tab>
            <Tab tabFor="vertical-tab-two">Tab 2</Tab>
            <Tab tabFor="vertical-tab-three">Tab 3</Tab>
        </TabList>

        <TabPanel tabId="vertical-tab-one">
            <p>Tab 1 content</p>
        </TabPanel>

        <TabPanel tabId="vertical-tab-two">
            <p>Tab content</p>
        </TabPanel>

        <TabPanel tabId="vertical-tab-three">
            <p>Tab 3 content</p>
        </TabPanel>
    </Tabs>
    );
}
}

export default VerticalTabs;