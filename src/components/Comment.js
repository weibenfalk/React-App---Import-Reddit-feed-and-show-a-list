import React from "react";

class Comment extends React.Component {
  render() {
    let comment = this.props.comment;
    let replies = (comment.data.replies) ? true : false;

    return (
      <div className="comment">
        <p className="author">{comment.data.author}</p>
        <p>{comment.data.body}</p>
        {/* If there is replies, call the renderComments function recursevily */}
        { replies && this.props.callback(comment.data.replies.data.children) }
      </div>
    );
  }
}

export default Comment;