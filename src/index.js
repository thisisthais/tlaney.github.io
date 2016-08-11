import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Terminal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: {},
      history: [],
      prompt: 'root@shervin$ '
    };

    this.showHelp = this.showHelp.bind(this);
  }

  componentDidMount() {
    var term = ReactDOM.findDOMNode(this.refs.term);

    this.registerCommands();
    this.showWelcomeMsg();
    term.focus();
  }

  clearHistory() {
    this.setState({ history: [] });
  }

  registerCommands() {
    this.setState({
      commands: {
        'clear' : this.clearHistory,
        'ls'    : this.listFiles,
        'intro' : this.showWelcomeMsg,
        'help'  : this.showHelp,
        'source': this.openLink('https://github.com/tlaney/HackerHunt/blob/master/src/index.js'),
      }
    });
  }

  listFiles() {
    this.addHistory("README.md");
  }

  openLink(link) {
      return function() {
        window.open(link, '_blank');
      }
  }

  showWelcomeMsg() {
    this.addHistory("Last login: Sat Aug 14 08:14:93 on ttys000");
    this.addHistory("Type `help` to see what all commands are available");
  }

  showHelp() {
    this.addHistory("help - this help text");
    this.addHistory("source - browse the code for this page");
    this.addHistory("intro - print intro message");
    this.addHistory("clear - clear screen");
    this.addHistory("ls - list files");
    this.addHistory("hint - get a password hint");
  }

  handleClick() {
    var term = ReactDOM.findDOMNode(this.refs.term);
    term.focus();
  }

  handleInput(e) {
    if (e.key === "Enter") {
        var input_text = ReactDOM.findDOMNode(this.refs.term).value;
        var input_array = input_text.split(' ');
        var input = input_array[0];
        var arg = input_array[1];
        var command = this.state.commands[input];

        this.addHistory(this.state.prompt + " " + input_text);

        if (command === undefined) {
            this.addHistory("sh: command not found: " + input);
        } else {
            command(arg);
        }
        this.clearInput();
    }
  }

  clearInput() {
    ReactDOM.findDOMNode(this.refs.term).value = "";
  }

  addHistory(output) {
    var history = this.state.history;
    history.push(output)
    this.setState({
      history: history
    });
  }

  render() {
    var output = this.state.history.map(function(op, i) {
        return <p key={i}>{op}</p>
    });
    return (
      <div className='input-area' onClick={this.handleClick.bind(this)}>
        {output}
        <p>
          <span className="prompt">{this.state.prompt}</span>
          <input
            type='text'
            onKeyPress={this.handleInput.bind(this)}
            ref='term'/>
        </p>
      </div>
    )
  }
}


// Take this component's generated HTML and put it
// on the page (in the DOM).
ReactDOM.render(<Terminal />, document.getElementById('app'));
