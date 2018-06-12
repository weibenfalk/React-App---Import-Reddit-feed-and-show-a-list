import React from "react";
import Comment from "./Comment";

class CommentsLoader extends React.Component {
  state = {
    allComments: [],
    commentVisible: false,
    fetchText: false
  }

  showComments = () => {
    this.setState({ commentVisible: !this.state.commentVisible })

    if (this.state.allComments.length === 0) {
      this.setState({ fetchText: true})
      const commentsJSONLink = `https://www.reddit.com${this.props.link.slice(0, -1)}.json`;

      fetch(commentsJSONLink)
      .then(res => res.json())
      .then(res => this.setState({allComments: res[1].data.children}))
      .then(res => this.setState({ fetchText: false}))
      .catch( () => {
        console.log("error");
      });
    }
  }

  renderComments = (commentObjects) => {
    // This works also as a recursive function that´s being called from <Comment> component again if there are replies to the comment
    return (
    <div>
      {commentObjects.map( (comment, key) => {
        return <Comment key={key} comment={comment} callback={this.renderComments} />
      })}
    </div>
    );
  }

  render() {
    return (
      <div>
        { this.props.numComments > 0 ? <button className="comments-button" onClick={this.showComments}>Comments</button> : null }
        { this.state.fetchText ? <span className="fetching-comments">Fetching comments ...</span> : null }
        { (this.state.allComments.length > 0 && this.state.commentVisible) ? this.renderComments(this.state.allComments) : null }
      </div>
    );
  }
}

export default CommentsLoader;