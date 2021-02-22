import '../styles/globals.scss';
import 'highlight.js/styles/vs2015.css';
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
