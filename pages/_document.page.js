import { Html, Head, Main, NextScript } from 'next/document';
import { Navbar } from './common/Navbar';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Navbar />
        <div className="relative">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
