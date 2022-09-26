import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="font-Inter">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
