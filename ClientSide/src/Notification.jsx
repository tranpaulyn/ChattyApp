import React, {Component} from 'react';


export class Notification extends Component {
    render() {
        return (
            <div className="message system">
                {this.props.notification}
            </div>
        );
    }
    
}
