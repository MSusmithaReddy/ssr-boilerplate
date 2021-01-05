import React from 'react';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import makeStore from '../store';
// import { languageDefinations } from '../utils/lang';
import { actionCreators, selectors } from '../store/home';
import Landing from '../components/Landing';

class Home extends React.Component {
  static async getInitialProps({ store, isServer, query, req, res }) {
    await store.dispatch(actionCreators.getSpaceXData(query));
    return { isServer };
  }

  componentDidMount() {
    // if (this.props.url.query.category) {
    //   this.pageName = this.props.url.query.category;
    //   this.pageType = 'mainCategoryPage';
    // }
    // Base.prototype.componentDidMount.call(this);
    //   this.props.getSpaceXData();
  }

  render() {
    const { loaderProps, url } = this.props;
    return (
      <div>
        <Landing />
      </div>
    );
  }
}

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSpaceXData: actionCreators.getSpaceXData,
    },
    dispatch
  );

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Home);