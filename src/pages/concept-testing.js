import React from 'react';

export const BASIC_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function apiResponse(method,header = BASIC_HEADER,body,endPoint) {
      let response = await fetch(endPoint,
        {
              method: method,
              headers: header,
              body: JSON.stringify(body),
        });

        const content = await response.json();

        if (response.status !== 200) {
            return false;
        }
        return content;
}


export default class Concept extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            stdout:"",
        }

        this.textInput = React.createRef();
    }

    handleSendingCommand = async() => {
        const input = this.textInput.current.value;
        if(!input || input.length === 0) return;

        const result = await apiResponse('POST',BASIC_HEADER,
        {
            command:input,
        },'exec');

        this.setState({stdout:result.body});

        return;
    }

    render(){
        return(
            <div>
                <input 
                    type = "text"
                    ref = {this.textInput}
                />
                <button onClick = {() => this.handleSendingCommand()}>Send Command</button>
                <br/>
                <div style = {{whiteSpace:'pre-line',textAlign:"left"}}>
                    {this.state.stdout}
                </div>
            </div>
        )
    }
}