import "@styles/initialization.css";
import "@styles/public.sass";
import "@styles/parkOverview.sass";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";
import MyContextWrapper from "@components/MyContext/MyContext";
import MapScrtpi from "@components/MapScript/MapScript";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <MapScrtpi></MapScrtpi>
      <MyContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MyContextWrapper>
    </div>
  );
}

export default MyApp;
