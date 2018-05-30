import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {

	static propTypes = {
		tasks: PropTypes.array.isRequired,
	}

  getTasks() {
    return [{ _id: 1, text: 'This is task 1' }, { _id: 2, text: 'This is task 2' }, { _id: 3, text: 'This is task 3' }];
  }

  renderTasks() {
    return this.props.tasks.map((task) => <Task key={task._id} task={task} />);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Find the text field via the REact ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if (text == '') return;

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <form className="new-task" onSubmit={this.handleSubmit}>
            <input type="text" ref="textInput" placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch(),
  };
})(App);
