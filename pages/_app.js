import React from 'react'
import App, { Container } from 'next/app';
import WithLoadingBar from '../lib/hoc';

class MyApp extends App {
    static async getInitialProps(initArgs) {
     const { Component, ctx } = initArgs;
     const { query } = ctx;
        let pageProps = {}
        if(Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
        pageProps = {
          ...pageProps,
        }
        return { pageProps  }
      }

    render () {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

// const makeStore = () => store;

export default WithLoadingBar(MyApp);