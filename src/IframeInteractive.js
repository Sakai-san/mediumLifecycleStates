import React from "react";
import isURL from "validator/lib/isURL";
import spinner from "./ring-loader.gif";

class Iframe extends React.Component {
  state = {
    prevUrl: this.props.url
  };

  static getDerivedStateFromProps(props, state) {
    if (props.url !== state.prevUrl) {
      return {
        prevUrl: props.url
      };
    }

    return null;
  }

  handleOnLoad = e => {
    this.props.onLoad(e);
  };

  render() {
    return <iframe src={this.props.url} onLoad={this.handleOnLoad} />;
  }
}

class IframeWithSpinner extends React.Component {
  state = {
    isLoading: true,
    prevUrl: this.props.url
  };

  static getDerivedStateFromProps(props, state) {
    if (props.url !== state.prevUrl) {
      return {
        isLoading: true,
        prevUrl: props.url
      };
    }

    return null;
  }

  handleOnLoad = e => this.setState({ isLoading: false });

  render() {
    const [{ url }, { isLoading }] = [this.props, this.state];

    return (
      <div>
        {isLoading && <img src={spinner} alt="spinner" />}
        <Iframe url={url} onLoad={this.handleOnLoad} />
      </div>
    );
  }
}

export default class IframeInteractive extends React.Component {
  state = {
    url: ""
  };

  handleOnChange = e => this.setState({ url: e.target.value });

  render() {
    return (
      <div>
        <input onChange={this.handleOnChange} />
        {isURL(this.state.url) && <IframeWithSpinner url={this.state.url} />}
      </div>
    );
  }
}
