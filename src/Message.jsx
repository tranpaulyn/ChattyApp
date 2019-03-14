import React, {Component} from 'react';


export class Message extends Component {
    render() {


        let color = this.props.color;

        let style = {
            color: color
        }

        switch(this.props.message.type) {
            case "incomingNotification":
            return (<div className="message system">
            {this.props.message.content}
            </div>)
            case "incomingMessage":
            return (
            <div className="message">
                <span style={style} className="message-username">{this.props.message.username}</span>
                <span className="message-content">{this.props.message.content}</span>
            </div>
            );
            break;
    }
    
}
}
