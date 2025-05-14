// pages/_app.js
import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <title>Charity Connect</title>
        <meta name="description" content="Connecting charities with volunteers" />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;