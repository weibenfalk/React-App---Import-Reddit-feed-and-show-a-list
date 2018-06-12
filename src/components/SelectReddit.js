import React from "react";

class SelectReddit extends React.Component {
  myInput = React.createRef();

  changeSubReddit = (e) => {
    e.preventDefault();
    this.props.callback(this.myInput.current.value);
  }

  render() {
    return (
      <form className="selectform" onSubmit={this.changeSubReddit}>
        <h1>Enter a Subreddit</h1>
        <input
          type="text"
          ref={this.myInput}
          placeholder="Select Subreddit"
          defaultValue="starwars"
        />
        <button type="submit">Submit →</button>
      </form>
    );
  }
}

export default SelectReddit;