import React, {Component} from 'react';


export class NavBar extends Component {
    render() {
        console.log(this.props.count);

            return (
              <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="navbar-counter">{this.props.count} users online</span>
              </nav>
            );
          }
}
