import React from "react";
import FeedItem from "./FeedItem";
import SelectReddit from "./SelectReddit";

class App extends React.Component {
  state = {
    feedItems: {},
    before: null,
    after: null,
    limit: 10,
    counter: 0,
    subReddit: 'starwars'
  };

  componentDidMount = () => {
    // Load the (initial) JSON here
    this.loadFeed(this.state.subReddit, null, null, this.state.limit, 0);
  }

  loadFeed = (subreddit, before, after, limit, count) => {
    let endpoint = `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;

    if(before) {
      endpoint += `&count=${count + limit}&before=${before}`;
      this.setState({counter: this.state.counter - this.state.limit});
    }
    if(after) {
      endpoint += `&count=${count + 1}&after=${after}`;
      this.setState({counter: this.state.counter + this.state.limit});
    }

    fetch(endpoint)
    .then(res => res.json())
    .then(res => getValues(res.data))
    .then(res => this.setState({feedItems: res}))
    .catch( () => {
      console.log("error");
    });

    const getValues = (res) => {
      this.setState({before: res.before});
      this.setState({after: res.after});
      return res.children.map(post => ({
        thumbnail: post.data.thumbnail,
        created: post.data.created_utc,
        num_comments: post.data.num_comments,
        author: post.data.author,
        score: post.data.score,
        permalink: post.data.permalink,
        title: post.data.title,
        selftext: post.data.selftext,
        id: post.data.id
      }));
    }
  }

  beforeCallback = () => {
    this.loadFeed(this.state.subReddit, this.state.before, null, this.state.limit, this.state.counter);
    console.log(this.state.counter);
  }

  afterCallback = () => {
    this.loadFeed(this.state.subReddit, null, this.state.after, this.state.limit, this.state.counter);
    console.log(this.state.counter);
  }

  changeLimit = (newLimit) => {
    this.setState({ limit: newLimit });
    this.loadFeed(this.state.subReddit, null, null, newLimit, 0);
  }

  selectSubreddit = (subreddit) => {
    this.loadFeed(subreddit, null, null, this.state.limit, 0);
    this.setState({ subReddit: subreddit});
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header-wrapper">
          <div className="selectform-wrapper">
            <SelectReddit callback={this.selectSubreddit} />
          </div>
          <div className="limitbuttons">
            <span className="postsperpage">Posts per page</span>
            <button className="button-limit-5" onClick={() => this.changeLimit(5)}>5</button>
            <button className="button-limit-5" onClick={() => this.changeLimit(10)}>10</button>
            <button className="button-limit-5" onClick={() => this.changeLimit(25)}>25</button>
          </div>
          <div className="clear"></div>
        </div>
        <ul className="redditfeed">
          {Object.keys(this.state.feedItems).map( (item, index) => (
          <FeedItem
            key={this.state.feedItems[item].id}
            feedItem={this.state.feedItems[item]}
          />
          ))}
        </ul>
        { this.state.before <= 0 || <button className="button-before" onClick={this.beforeCallback}>Previous</button> }
        { this.state.after <= 0 || <button className="button-after" onClick={this.afterCallback}>Next</button> }
      </div>
    )
  }
}

export default App;