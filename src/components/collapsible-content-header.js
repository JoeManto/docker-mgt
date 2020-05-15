import React from 'react';

import '../css/collapsible-content-header.css';
import { Flex, StickyOutlineButton} from './general';
import { Button } from 'react-bootstrap'

export class CollapsibleContentHeader extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {
            closed:false,
            filters:this.props.filters,
        }
    }

    handleContentToggle(){
        this.setState({closed:!this.state.closed});
    }

    handleFilterClick(filterKey){
        let filters = this.state.filters;

        filters[filterKey] = !filters[filterKey];

        this.setState({filters:filters});

        this.props.onFilterChange(filters);
    }

    render() {
        return (
            <div className = {'collapsible-header'}>
                <div className = {'collapsible-header-text'}>
                    <h2>{this.props.title}</h2>
                    <p className="mb-2 text-muted">{this.props.subtitle}</p> 
                    
                    <Flex direction = {'row'} style = {{flexWrap:'wrap'}}>
                        {Object.keys(this.props.filters).map(filterKey => {
                            if(this.props.filters[filterKey]){
                                return <StickyOutlineButton style = {{marginRight:'5px'}} pressed = {true} onClick = {() => this.handleFilterClick(filterKey)} btnText = {filterKey}/> 
                            }else{
                                return <StickyOutlineButton style = {{marginRight:'5px'}} pressed = {false} onClick = {() => this.handleFilterClick(filterKey)} btnText = {filterKey}/> 
                            }
                        })}
                    </Flex>
                </div>

                <div 
                    className = {this.state.closed ?'collapsible-header-arrow-down':'collapsible-header-arrow-up'}
                    onClick = {() => {this.handleContentToggle();}}
                ></div>


                <div className = {'collapsible-header-content'}>
                    {!this.state.closed && this.props.children}
                </div>
            </div>
        );
    }
}