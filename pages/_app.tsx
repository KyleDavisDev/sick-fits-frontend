import App from "next/app";
import Page from "../components/Page/Page";

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Page>
        <Component {...pageProps} />
      </Page>
    );
  }
}

export default MyApp;
