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
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>绿色碳链-可信绿色数据服务平台</title>
        <link rel="icon" href="/logo.png" />
      </Head>
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
