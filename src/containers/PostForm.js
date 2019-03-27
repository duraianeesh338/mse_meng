import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Divider,
  Icon,
  Upload,
  Checkbox,
  Button,
  AutoComplete,
  message,
  Tooltip,
  InputNumber,
  DatePicker
} from "antd";
import moment from "moment";

import { postProject, editPost } from "../store/actions/posts";

const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class PostForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Should format date value before submit.
        const project = {
          company: this.props.username,
          title: values.title,
          abstract: values.abstract,
          description: values.description,
          studentNeeded: values.studentNeeded,
          requirements: values.requirements,
          deadline: values["date-picker"].format("YYYY-MM-DD"),
          email: values.email,
          phoneNumber: values.phoneNumber,
          file: values.dragger
        };
        if (this.props.currentPost) {
          this.props.editPost(
            this.props.token,
            this.props.currentPost.id,
            project
          );
          message.loading("Updating", 2, () =>
            message.success("Successfully updated", 2)
          );
        } else {
          this.props.postProject(this.props.token, project);
          message.loading("Uploading", 2, () =>
            message.success("Successfully posted", 2)
          );
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <Divider orientation="left">Project Information</Divider>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Company&nbsp;
              <Tooltip
                title={
                  "Not " +
                  this.props.username +
                  "? Logout with the button on the left"
                }
              >
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Input value={this.props.username} disabled="true" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input the title!",
                whitespace: true
              }
            ],
            initialValue: this.props.currentPost
              ? this.props.currentPost.title
              : null
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Abstract">
          {getFieldDecorator("abstract", {
            rules: [{ required: true }],
            initialValue: this.props.currentPost
              ? this.props.currentPost.abstract
              : null
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator("description", {
            rules: [{ required: true }],
            initialValue: this.props.currentPost
              ? this.props.currentPost.description
              : null
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Student Needed&nbsp;
              <Tooltip title="You can update this later as needed">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("studentNeeded", {
            rules: [{ required: true }],
            initialValue: this.props.currentPost
              ? this.props.currentPost.studentNeeded
              : 3
          })(<InputNumber min={0} max={100} />)}
          <span className="ant-form-text"> students</span>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Requirements&nbsp;
              <Tooltip title="Coursework, skills, etc.">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("requirements", {
            rules: [{ required: true }],
            initialValue: this.props.currentPost
              ? this.props.currentPost.requirements
              : null
          })(<TextArea rows={4} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Deadline">
          {getFieldDecorator("date-picker", {
            rules: [{ required: true, message: "Please select a date!" }],
            initialValue: this.props.currentPost
              ? moment(this.props.currentPost.deadline, "YYYY-MM-DD")
              : null
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Files">
          <div className="dropbox">
            {getFieldDecorator("dragger", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload
                name="logo"
                accept=".pdf,.jpg,.png,.doc,.docx"
                listType="picture"
                beforeUpload={(file, fileList) => false}
              >
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
            )}
          </div>
        </Form.Item>
        <Divider orientation="left">Contact Information</Divider>
        <Form.Item {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ],
            initialValue: this.props.currentPost
              ? this.props.currentPost.email
              : null
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phoneNumber", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ],
            initialValue: this.props.currentPost
              ? this.props.currentPost.phoneNumber
              : null
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Website">
          {getFieldDecorator("website", {
            rules: [{ required: true, message: "Please input website!" }],
            initialValue: this.props.currentPost
              ? this.props.currentPost.website
              : null
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {this.props.currentPost ? "Update" : "Post"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPostForm = Form.create({ name: "register" })(PostForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.posts.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postProject: (token, project) => dispatch(postProject(token, project)),
    editPost: (token, id, project) => dispatch(editPost(token, id, project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedPostForm);
