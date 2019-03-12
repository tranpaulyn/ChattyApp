import React, {Component} from 'react';

export class ChatBar extends Component {
    constructor () {
        super();
        this.keyHandler = this.keyHandler.bind(this);
    }
    keyHandler(evt) {
        if (evt.keyCode === 13) {
            // console.log(evt.target.value);
            if (evt.target.value.length > 1) {
                this.props.addNewMessage(evt.target.value);
                evt.target.value = null;
            }
        };
    }
    render() {
    return (
        <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username} name="username"/>
      <input className="chatbar-message" onKeyUp={this.keyHandler} placeholder="Type a message and hit ENTER" name="newMessage"/>
    </footer>
      );
    }
    
}