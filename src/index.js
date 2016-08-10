import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Terminal from './components/terminal';

// Create a new component. This component should produce
// some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] };
  }

  render() {
    return (
      <div>
        <Terminal />
      </div>
    );
  }
}

// Take this component's generated HTML and put it
// on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));
