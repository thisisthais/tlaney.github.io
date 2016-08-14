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
    this.showIntro = this.showIntro.bind(this);
    this.tryPasskey = this.tryPasskey.bind(this);
  }

  componentDidMount() {
    var term = ReactDOM.findDOMNode(this.refs.term);

    this.registerCommands();
    this.showWelcomeMsg();
    term.focus();
  }

  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this);
    var container = document.getElementById("main");
    container.scrollTop = el.scrollHeight;
  }

  clearHistory() {
    this.setState({ history: [] });
  }

  registerCommands() {
    this.setState({
      commands: {
        'intro'  : this.showIntro,
        'help'   : this.showHelp,
        'hint'   : this.openLink('https://github.com/tlaney/HackerHunt/blob/master/test/style_tester'),
        'source' : this.openLink('https://github.com/tlaney/HackerHunt/blob/master/src/index.js'),
        'passkey': this.tryPasskey,
      }
    });
    console.log("registered");
  }

  listFiles() {
    this.addHistory("README.md");
  }

  openLink(link) {
      return function() {
        window.open(link, '_blank');
      }
  }

  showIntro() {
    this.addHistory("You must retrieve all 4 passkeys to hack into E-Corp's mainframe.");
    this.addHistory("To attempt a passkey, type 'passkey ' + your attempt.");
    this.addHistory("You can fail a passkey only 3 times.");
  }

  showWelcomeMsg() {
    this.addHistory("Last login: Sat Aug 14 08:14:93 on ttys000");
    this.addHistory("Type `help` to see what all commands are available");
  }

  showHelp() {
    this.addHistory("help - this help text");
    this.addHistory("source - browse the code for this page");
    this.addHistory("intro - print intro message");
    this.addHistory("hint - get a password hint");
    this.addHistory("passkey [input] - attempt a passkey");
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

  tryPasskey(input) {
    if (input === 'pr1nc355.py') {
      this.addHistory("Valid passkey");
      this.openLink('https://github.com/tlaney/HackerHunt/blob/master/test/frame_tester');
    } else if (input === 'k1llA77bugs.jar') {
      this.addHistory("Valid passkey");
      this.openLink('https://github.com/tlaney/HackerHunt/blob/master/test/bug_tester');
    } else if (input === 'gR177.apk') {
      this.addHistory("Valid passkey");
      this.openLink('https://github.com/tlaney/HackerHunt/blob/master/test/script_tester');
    } else if (input === 'l3a0z1nh0.exe') {
      this.addHistory("Valid passkey");
      this.openLink('https://github.com/tlaney/HackerHunt/blob/master/test/script_tester');
    } else {
      this.addHistory("Invalid passkey");
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
            ref='term'
            autofocus />
        </p>
      </div>
    )
  }
}

// first passkey location: Princess

// Take this component's generated HTML and put it
// on the page (in the DOM).
ReactDOM.render(<Terminal />, document.getElementById('app'));
