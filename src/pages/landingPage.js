import React from 'react';
import {DockerContainerList} from '../components/docker-container-list';

export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <DockerContainerList />
            </div>
        )
    }
}
