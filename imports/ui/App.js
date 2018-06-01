import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.string,
  }

  constructor(props) {
    super(props);
    
    this.state = {
      hideCompleted: false,
    };
  }

  getTasks() {
    return [{ _id: 1, text: 'This is task 1' }, { _id: 2, text: 'This is task 2' }, { _id: 3, text: 'This is task 3' }];
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter((task) => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;


      return (<Task 
        key={task._id} 
        task={task}
        showPrivateButton={showPrivateButton}
      />);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Find the text field via the REact ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if (text == '') return;

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
          </label>

          <AccountsUIWrapper />

          {this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input type="text" ref="textInput" placeholder="Type to add new tasks" />
            </form> : ''
          }
        </header>

        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
