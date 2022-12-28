import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onChangeName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    const {username, comment, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image-comment"
          />
          <div className="text-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name"
                placeholder="Your Name"
                value={username}
                onChange={this.onChangeName}
              />
              <br />
              <textarea
                rows="8"
                cols="33"
                placeholder="Your Comment"
                className="textarea"
                value={comment}
                onChange={this.onChangeComment}
              />
              <br />
              <button className="button-add" type="submit">
                Add Comment
              </button>
            </form>
          </div>
        </div>
        <hr className="line" />
        <p className="heading">
          <span className="comments-count">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
