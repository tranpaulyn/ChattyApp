import React, {Component} from 'react';
import messages from './messages.json';

export class Message extends Component {
    constructor (){
        super();
        this.state = {messages};
    }
    render() {
    // const messages = this.state.messages.messages.map(message => {
    //     const username = message.username;
    //     const content = message.content;
    // });
        return (
            <div className="message">
                <span className="message-username">{props.username}</span>
                <span className="message-content">{props.content}</span>
            </div>
        );
    }
    
}

