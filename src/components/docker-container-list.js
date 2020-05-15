import React from 'react';
import {apiFetch} from '../util/dataFetch';
import {Flex} from '../components/general';
import {CollapsibleContentHeader} from '../components/collapsible-content-header.js';

import {Card, Button, Spinner, Jumbotron} from 'react-bootstrap';
import '../css/docker-container-list.css'

export class DockerContainerList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isFetching:true,
            filters:{},
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    async componentDidMount(){
        const res = await apiFetch(
            'POST',
            '/containers',
            {all:true}
        );
        this.setState({fetchedData:res.body,isFetching:false});
    }

    handleFilterChange(filters){
        this.setState({filters:filters});
    }

    shouldShowContainer(container){
        const state = container.State.toLowerCase();
        const filters = this.state.filters;
        
        if(Object.keys(filters).length === 0) return true;

        if(filters['Show All']) return true;

        if(filters['Running'] && 'running' !== state){
            return false;
        }

        if(filters['Exited'] && 'exited' !== state){
            return false;
        }

        if(filters['Created'] && 'created' !== state){
            return false;
        }

        return true;
    }

    render(){
        return(
            <CollapsibleContentHeader 
                    title = {'Containers'} 
                    subtitle = {`All Docker containers of all statuses on the host`}
                    filters = {{
                                'Show All':false,
                                'Running':false,
                                'Exited':false,
                                'Created':false,
                            }}
                    onFilterChange = {this.handleFilterChange} >

                {this.state.isFetching || !this.state.fetchedData ? (
                    <Spinner animation="border" variant="primary" style = {{position:'fixed',top:'50%',left:'50%'}}/>
                ) : (
                    <Flex direction = "row" style = {{flexWrap:'wrap'}}>
                        {this.state.fetchedData.map(container => {
                            if(this.shouldShowContainer(container)){
                                return <ContainerCard containerData = {container}/>
                            }else{
                                return null
                            }
                        })}
                    </Flex>
                )}
            </CollapsibleContentHeader>
        )
    }
}

class ContainerCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    shortenIDHash(id){
        let short = id.slice(0,12);
        short = short.concat('...');
        return short;
    }

    getColoredStateStyle(State){
        if(State === 'running'){
            return {color:'var(--success)'}
        }
        if(State === 'exited'){
            return {color: 'var(--warning)'}
        }
        return {}
    }

    goToContainerView(){
        //window.location = `/containers/${this.props.containerData.Id}`;
    }

    render(){
        
        const {Id,Names,Status,State,Created} = this.props.containerData;

        return (
            <Card className = {'container-card'} style = {{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{Names[0].slice(1,Names[0].length)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.shortenIDHash(Id)}</Card.Subtitle>
                </Card.Body>
                <Card.Text className = {'container-card-text'}>
                    <div style = {this.getColoredStateStyle(State)}>
                        {State}
                    </div>
                    <br/>
                    {Status.toLowerCase() === 'created' ?
                        (
                            <div>{new Date(Created).toLocaleString()}</div>
                        ) : (
                            <div>{Status}</div>
                        )
                    }  
                </Card.Text>
    
                <Button onClick = {() => {this.goToContainerView()}} className = {'container-card-button'} variant = "primary">View</Button>
            </Card>
        )
    }
}
















