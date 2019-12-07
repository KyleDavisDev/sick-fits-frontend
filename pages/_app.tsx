import App from "next/app";
import Page from "../components/Page/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import { ApolloClient } from "apollo-boost";

export interface MyAppProps {
  apollo: ApolloClient<unknown>;
}

class MyApp extends App<MyAppProps> {
  // public async getInitialProps({ Component, ctx }) {
  //   let pageProps: { query?: string } = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps();
  //   }

  //   // This exposes the queyr to the user
  //   pageProps.query = ctx.query;

  //   return { pageProps };
  // }

  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  public render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
