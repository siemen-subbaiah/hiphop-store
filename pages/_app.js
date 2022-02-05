import '../styles/globals.css';
import Layout from '../components/utils/Layout';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color='#388697' height={2} />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
