import React, { Component } from 'react';
import './statusBar.css';

export default class StatusBar extends Component {
  render() {
    const { server, info, error } = this.props.status;
    let connection = error ? "fail" : "good";

		return (
			<footer>
        <span>
          Copyright: <span className="primary">© Wiliot, 2021&nbsp;&nbsp;</span>
        </span>
        <span>
          Status: <span className={connection}>{info}&nbsp;</span>
        </span>
        <span>
          Server: <span className="primary">{server}&nbsp;</span>
        </span>
      </footer>
		);
  }
}