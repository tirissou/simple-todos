import React, { Component } from 'react';
import PropType from 'prop-types';
import { Meteor } from 'meteor/meteor';

// Task component - representing a single todo item
export default class Task extends Component {
  static propTypes = {
    task: PropType.array.isRequired,
  };

  toggleChecked = () => {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  };

  deleteTask = () => {
    Meteor.call('tasks.remove', this.props.task._id);
  };

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    const text = this.props.task.text;

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteTask}>
          &times;
        </button>

        <input type="checkbox" readOnly checked={!!this.props.task.checked} onClick={this.toggleChecked} />

        <span className="text">{text}</span>
      </li>
    );
  }
}
