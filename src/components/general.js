import React from 'react';

import { Button } from 'react-bootstrap';

export function Flex(props) {

    return (
        <div style = {{...props.style,flexDirection:props.direction}}>
            {props.children}
        </div>
    )
}

export class StickyOutlineButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            pressed:this.props.pressed,
        }
    }

    handleButtonClick(){
        const newState = !this.state.pressed;
        if(this.props.onClick) this.props.onClick(newState);
        this.setState({pressed:newState});
    }

    render(){
        return(
            <div style = {{...this.props.style,display:'inline-block'}}>
                {this.state.pressed ? (
                    <Button onClick = {()=>{this.handleButtonClick()}} variant="primary">{this.props.btnText}</Button>
                ) : (
                    <Button onClick = {()=>{this.handleButtonClick()}} variant="outline-primary">{this.props.btnText}</Button>
                )}
            </div>
        )
    }
}

