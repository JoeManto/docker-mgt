import React from 'react';
import {apiFetch} from '../util/dataFetch';
import {Flex} from '../components/general';
import {CollapsibleContentHeader} from '../components/collapsible-content-header.js';
import { Info, X} from 'react-bootstrap-icons';



import {Card, Button, Spinner, Jumbotron, Alert, Popover, OverlayTrigger,Toast} from 'react-bootstrap';
import '../css/docker-container-list.css'

console.log(require('react-bootstrap-icons'));

export class DockerImageList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isFetching:true,
            shouldShowDanglingWarning:true,
        }
    }

    async componentDidMount(){
        const res = await apiFetch(
            'POST',
            '/images',
            {all:true}
        );
        this.setState({fetchedData:res.body,numDanglingImages:res.numDanglingImages,isFetching:false});
    }

    danglingImagesWarning(){
        return (
            <Alert className = {'container-card-text'} variant = {'warning'}>
                <div onClick = {()=>{this.removeDanglingImageWarning()}}
                    style = {{float:'right',marginRight:'50px'}}>
                <X/>
                </div>
                <strong>Looks like the Docker file system has a couple dangling images.</strong>
                <br/><br/>These images lack a reference to a intermediate child image.
                You can resolve these images by deleting them or pruning all images.
            </Alert>
        );
    }

    removeDanglingImageWarning(){
        this.setState({shouldShowDanglingWarning:false});
    }

    render(){
        return(
            <CollapsibleContentHeader 
                title = {'Images'} 
                subtitle = {`All Docker images on the host`}
                filters = {{}} >

                {this.state.isFetching || !this.state.fetchedData ? (
                    <Spinner animation="border" variant="primary" style = {{position:'absolute',top:'50%',left:'50%'}}/>
                ) : (
                    <div>
                        {(this.state.numDanglingImages >= 1 && this.state.shouldShowDanglingWarning) &&
                            this.danglingImagesWarning()
                        }
                        <Flex direction = "row" style = {{flexWrap:'wrap'}}>
                            {this.state.fetchedData.map(image => {
                                return <ImageCard imageData = {image}/>
                            })}
                        </Flex>
                    </div>
                )}
            </CollapsibleContentHeader>
        )
    }
}

class ImageCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    shortenIDHash(id){
        let short = id.slice(7,19);
        short = short.concat('...');
        return short;
    }

    render(){
        
        const {Id,Size,RepoTags,Created} = this.props.imageData;

        return (
            
            <Card className = {'container-card'} style = {{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{RepoTags[0].slice(0,RepoTags[0].length)}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.shortenIDHash(Id)}</Card.Subtitle>
                </Card.Body>
                
                { this.props.imageData.dangling &&
                <div>
                    <label className = {'container-card-text'} style = {{color:'var(--blue)'}}>Dangling Image</label>
                    <OverlayTrigger
                        trigger="click"
                        key={'top'}
                        placement={'top'}
                        overlay={
                            <Popover id={`popover-positioned-${'top'}`}>
                                <Popover.Title as="h3">{`Dangling Image`}</Popover.Title>
                                <Popover.Content>
                                <strong>No other images reference this image!</strong>{' '}
                                Run docker image prune or delete the image to free up space
                                </Popover.Content>
                            </Popover>
                        }
                    >
                    <Button variant="link"><Info size={24}/></Button>
                    </OverlayTrigger>  
                </div>
                }   
               
                <div className = {'container-card-text'}>{(Size/1e+9).toFixed(2)}{'GB'}</div>
    
                <Button className = {'container-card-button'} variant = "primary">View</Button>
            </Card>
        )
    }
}
















