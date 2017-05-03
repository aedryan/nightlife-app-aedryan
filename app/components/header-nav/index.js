import React from 'react';

export default class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        };
    }

    getLoginElem() {
        if (this.props.loggedIn) {
            return (
                <div className="dropdown">
                    <a className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <span>{this.state.username}</span>
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="/auth/logout">Log Out</a></li>
                    </ul>
                </div>
            );
        } else {
            return (
                <a href='/auth/facebook'>Log in with Facebook</a>
            );
        }
    }

	render() {
		return (
			<div id="header-nav">
                <a href='/home'>Home</a>
                <h1>Nightlife</h1>
                {this.getLoginElem()}
            </div>
		);
	}
}