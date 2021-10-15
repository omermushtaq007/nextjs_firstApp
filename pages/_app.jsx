import 'tailwindcss/tailwind.css'
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris'
// import translations from "@shopify/polaris/locales/en.json";


function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
