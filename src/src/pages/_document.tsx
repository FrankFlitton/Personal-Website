import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="L2HH7lfmukEAKrtDsmwYMT3Xc07WaYqsYySM5y3AreI"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-FENYV3J4RR"
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* <!-- Netlify Hidden Form --> */}
          <form
            hidden
            method="post"
            name="contact"
            netlify-honeypot="form-name"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input name="name" />
            <input name="email" />
            <textarea name="message"> </textarea>
          </form>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
