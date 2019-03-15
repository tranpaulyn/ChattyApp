import React, {Component} from 'react';

export class Message extends Component {
  render() {
    // Set color for user
    let style = {color: this.props.color}

    // If message is an image
    let imgURL = this.props.message.content

    // Receive type of message and returns the appropriate HTML
    switch(this.props.message.type) {
      case 'incomingNotification':
        return (
          <div className="message system">
            {this.props.message.content}
          </div>)

      case 'incomingMessage':
        return (
          <div className="message">
            <span style={style} className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        );

      case 'incomingImage':
        return (
          <div className="message">
            <span style={style} className="message-username">{this.props.message.username}</span>
            <span className="message-content"><img className="image" alt="I sent a broken URL!" src={imgURL} /></span>
          </div>)
    }
  }
}