import React, { Component } from "react";

import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";

import webImg from "./img/web.png";
import htmlImg from "./img/html.png";
import cssImg from "./img/css.png";
import jsImg from "./img/javascript.png";
import reactImg from "./img/react.png";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props); 
    this.max_content_id = 4;
    this.state = {
      mode: "welcome",
      selected_content_id: 0, 
      subject: { title: "WEB", sub: "World Wide Web!" }, 
      welcome: { title: "Welcome", desc: "Hello, React!!", image: webImg },
      contents: [
        {
          id: 1,
          title: "HTML",
          desc: "HTML is for information",
          image: htmlImg,
        },
        { id: 2, title: "CSS", desc: "CSS is for design", image: cssImg },
        {
          id: 3,
          title: "JavaScript",
          desc: "JS is for interactive",
          image: jsImg,
        },
        { id: 4, title: "React", desc: "React is for UI", image: reactImg },
      ],
    };
  };

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title,
      _desc,
      _image,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _image = this.state.welcome.image;
      _article = (
        <ReadContent title={_title} desc={_desc} img={_image}></ReadContent>
      );
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent
          title={_content.title}
          desc={_content.desc}
          img={_content.image}
        ></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
              image: "",
            });
            this.setState({ contents: _contents });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      var _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({ contents: _contents, mode: "read" });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read", 
              selected_content_id: Number(id), 
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({ mode: "welcome", contents: _contents });
                alert("deleted!");
              }
            } else {
              this.setState({ mode: _mode });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}


export default App;
