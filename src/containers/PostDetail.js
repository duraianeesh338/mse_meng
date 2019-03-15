import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { getPostDetail, editPost } from "../store/actions/posts";
import { Link, withRouter } from "react-router-dom";

import Hoc from "../hoc/hoc";
import QA from "./QA";

class PostDetail extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPostDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPostDetail(newProps.token, this.props.match.params.id);
      }
    }
  }
  render() {
    const {
      title,
      abstract,
      description,
      email,
      phoneNumber
    } = this.props.currentPost;
    return (
      <Hoc>
        {Object.keys(this.props.currentPost).length > 0 ? (
          <Card
            title={title}
            extra={
              <Link to="/">
                <Button icon="left-circle"> Back </Button>
                <Button
                  onClick={() => {
                    this.props.editPost(
                      this.props.token,
                      this.props.match.params.id,
                      this.props.currentPost
                    );
                  }}
                >
                  Back
                </Button>
              </Link>
            }
          >
            <Card type="inner" title="Abstract">
              {abstract}
            </Card>
            <Card type="inner" title="Description">
              {description}
            </Card>
            <Card type="inner" title="e-mail">
              {email}
            </Card>
            <Card type="inner" title="Phone Number">
              {phoneNumber}
            </Card>
            <Card type="inner" title="Q&A">
              <QA />
            </Card>
          </Card>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentPost: state.posts.currentPost,
    loading: state.posts.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostDetail: (token, id) => dispatch(getPostDetail(token, id)),
    editPost: (token, id, project) => dispatch(editPost(token, id, project))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);
