import React, {Component} from 'react';


export class NavBar extends Component {
    render() {
            return (
              <nav className="navbar">
                <a href="/" className="navbar-brand">C u t e  C h a t t y</a>
                <span className="navbar-counter">{this.props.count} users online</span>
              </nav>
            );
          }
}
