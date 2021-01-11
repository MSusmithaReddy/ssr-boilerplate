import React, { Component } from 'react';

const WithLoadingBar = Child => {
  return class WithLoadingBar extends Component {
    state = { pageLoading: true, pathname: this.props.router.asPath };
    static getInitialProps(ctx) {
      if (Child.getInitialProps) {
        return Child.getInitialProps(ctx);
      }
    }

    render() {
      return (
        <div>
          <Child
            {...this.props}
          />
        </div>
      );
    }
  };
};

export default WithLoadingBar;