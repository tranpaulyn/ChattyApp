import React, {Component} from 'react';

export class ChatBar extends Component {
    constructor () {
        super();
        this.keyHandler = this.keyHandler.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }
    keyHandler(evt) {
        if (evt.keyCode === 13) {
            // Make sure field is not empty
            if (evt.target.value.length >= 1) {
                this.props.addNewMessage(evt.target.value);
                evt.target.value = null;
            }
        };
    }

    changeUsername(evt) {
        if (evt.keyCode === 13) {
            console.log(this.props.currentUser.name)
            if (evt.target.value.length >= 1) {
            this.props.changeName(evt.target.value);
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