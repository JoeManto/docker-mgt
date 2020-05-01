import React from 'react';
import {apiFetch} from '../util/dataFetch';

export class DockerContainerList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isFetching:true
        }
    }

    async componentDidMount(){
        const res = await apiFetch(
            'POST',
            '/getContainers',
            {command:'ls -la'}
        );

        console.log(res.body);
        this.setState({fetchedData:res.body,isFetching:false});
    }

    render(){
        return(
            <div>
                {this.state.isFetching ? 'fetching data' : 'data is fetched'}
            </div>
        )
    }

}