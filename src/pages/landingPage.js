import React from 'react';
import {DockerContainerList} from '../components/docker-container-list.js';
import {DockerImageList} from '../components/docker-image-list.js'

export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>

                <DockerContainerList />
                <DockerImageList />
            </div>
        )
    }
}
