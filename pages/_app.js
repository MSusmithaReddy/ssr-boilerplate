import React from 'react'
import App, { Container } from 'next/app';

class MyApp extends App {
    // static async getInitialProps ({ Component, ctx }) {
    //     return {
    //         pageProps: Component.getInitialProps
    //             ? await Component.getInitialProps(ctx)
    //             : {}
    //     }
    // }

    render () {
        const { Component, pageProps, store } = this.props;;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

// const makeStore = () => store;

export default MyApp;