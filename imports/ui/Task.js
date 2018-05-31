import React, { Component } from 'react';
import PropType from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - representing a single todo item
export default class Task extends Component {
  static propTypes = {
    task: PropType.array.isRequired,
    showPrivateButton: PropType.bool.isRequired,
  };

  toggleChecked = () => {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  };

  deleteTask = () => {
    Meteor.call('tasks.remove', this.props.task._id);
  };

  togglePrivate = () => {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    const text = this.props.task.text;

    return (
      <li className={taskClassName}>
        { this.props.showPrivateButton ? (
          <button className="delete" onClick={this.deleteTask}>
            &times;
          </button>
        ) : '' }

        <input type="checkbox" readOnly checked={!!this.props.task.checked} onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : '' }

        <span className="text">{text}</span>
      </li>
    );
  }
}
