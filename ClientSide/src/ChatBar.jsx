import React, {Component} from 'react';

export class ChatBar extends Component {
    constructor () {
        super();
        this.keyHandler = this.keyHandler.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }

    // Message Handler
    keyHandler(evt) {
        // When they press enter
        if (evt.keyCode === 13) {
            // Make sure field is not empty
            if (evt.target.value.length >= 1) {
                this.props.addNewMessage(evt.target.value);
                evt.target.value = null; // Clears the area, ready for next message
            }
        };
    }

    // Username Change Handler
    changeUsername(evt) {
        // When they press enter
        if (evt.keyCode === 13) {
            // Make sure field is not empty
            if (evt.target.value.length >= 1) {
                // New username cannot be the same as the old username
                if (this.props.username !== evt.target.value) {
                    this.props.changeName(evt.target.value);
                }
            }
        }
    }

    render() {
    return (
        <footer className="chatbar">
      <input className="chatbar-username" onKeyUp={this.changeUsername} placeholder="Your Name (Optional)"  name="username" defaultValue={this.props.username}/>
      <input className="chatbar-message" onKeyUp={this.keyHandler} placeholder="Type a message and hit ENTER" name="newMessage"/>
    </footer>
      );
    }
    
}

// 