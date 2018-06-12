import React from "react";
import CommentsLoader from "./CommentsLoader";

class FeedItem extends React.Component {
  state = {
    selfTextVisible: false
  };

  showSelfText = () => {
    if(this.props.feedItem.selftext) {
      this.setState({ selfTextVisible: !this.state.selfTextVisible })
    }
  }

  convertDate = (timestamp) => {
    // The Reddit Timestamp is in UNIX time so it has to be multiplied by 1000
    const formattedDate = new Date(timestamp * 1000);
    // Convert the date to readable format
    const year = formattedDate.getFullYear();
    let month = formattedDate.getMonth()+1;
    const day = formattedDate.getDate();

    // Add a zero on month and day on 1-9
    if (month < 10) month = '0' + month;
    if (day < 10) month = '0' + month;

    return (year + '/' + month + '/' + day);
  }

  render() {
    const { thumbnail, created, num_comments, author,
            score, permalink, title, selftext }
            = this.props.feedItem;

    return (
      <li className="feed-item">
        <img alt={title} className="feed-item-thumbnail" src={(thumbnail.includes('http')) ? thumbnail : "img/no-image.png" } />
        <div className="feed-item-content-wrappper">
          <div className="info">
            <ul className="infolist">
              <li className="li-author">
                Posted by: {author}
              </li>
              <li className="li-score">
                Score: {score}
              </li>
              <li className="li-created">
                Date posted: {this.convertDate(created)}
              </li>
              <li className="li-permalink">
                <a href={`https://www.reddit.com/${permalink}`}>Visit post on Reddit</a>
              </li>
            </ul>
          </div>
          <div className="feed-item-textwrapper">
            { (selftext !== "") ? <h1 className="feed-title has-text" onClick={this.showSelfText}>{title}</h1> : <h1 className="feed-title">{title}</h1>}
            { (this.state.selfTextVisible) ? <div className="feed-item-text">{selftext}</div> : null }
          </div>
          <div className="feed-item-commentswrapper">
            <CommentsLoader link={permalink} numComments={num_comments} />
          </div>
        </div>
      </li>
    );
  }
}

export default FeedItem;
