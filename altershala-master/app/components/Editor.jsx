import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Custom "star" icon for the toolbar using an Octicon
const CustomButton = () => <span className="octicon octicon-star" />;

// Event handler to insert a star
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '★');
  this.quill.setSelection(cursorPosition + 1);
}

// Custom toolbar component including all tools
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={() => {}}>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-link" />
    <button className="ql-script" value="sub" />
    <button className="ql-script" value="super" />
    <button className="ql-blockquote" />
    <select className="ql-align">
      <option value=""></option>
      <option value="center"></option>
      <option value="right"></option>
      <option value="justify"></option>
    </select>
    <select className="ql-direction">
      <option value=""></option>
      <option value="rtl"></option>
    </select>
    <button className="ql-code-block" />
    <button className="ql-formula" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-background" />
    <button className="ql-color" />
    <button className="ql-font" />
    <button className="ql-code" />
    <button className="ql-inline-code" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <select className="ql-size">
      <option value=""></option>
      <option value="small"></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>
    <select className="ql-insertStar">
      <CustomButton />
    </select>
  </div>
);

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
    
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          theme="snow"
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertStar: insertStar,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
  'background',
  'script',
  'align',
  'direction',
  'code-block',
  'formula',
  'image',
  'video',
  'code',
  'inline-code',
  'list',
];

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
