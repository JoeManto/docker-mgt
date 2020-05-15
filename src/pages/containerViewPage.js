import React from 'react';

export default class ContainerViewPage extends React.Component {

    constructor(props){
        super(props);

        console.log(window.location.pathname.split('/'));
    }

    render(){
        return(
            <div>
                hello
            </div>
        );
    }

    
}