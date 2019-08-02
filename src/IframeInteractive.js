import React from "react";
import isURL from "validator/lib/isURL";
import spinner from "./spinner.gif";

class Iframe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      prevUrl: props.url
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.url !== state.prevUrl) {
      return {
        hasError: false,
        prevUrl: props.url
      };
    }

    return null;
  }

  handleOnLoad = e => {
    const hasIframe = e.target.contentWindow.length;

    if (!hasIframe) {
      this.setState({ hasError: true });
    }

    this.props.onLoad(e);
  };

  render() {
    const [{ url }, { hasError }] = [this.props, this.state];

    return hasError ? (
      <div>Cannot load the iframe</div>
    ) : (
      <iframe src={url} onLoad={this.handleOnLoad} />
    );
  }
}

class IframeWithSpinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      prevUrl: props.url
    };
  }

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
        <input onChange={this.handleOnChange} style={{ margin: "20px" }} />
        {isURL(this.state.url) && <IframeWithSpinner url={this.state.url} />}
      </div>
    );
  }
}

//https://html.spec.whatwg.org/
