import { Provider } from 'react-redux';
import Layout from '../components/utils/Layout';
import { store } from '../src/app/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
