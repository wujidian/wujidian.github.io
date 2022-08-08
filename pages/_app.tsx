import "@styles/initialization.css";
import "@styles/public.sass";
import "@styles/parkOverview.sass";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";
import MyContextWrapper from "@components/MyContext/MyContext";
import MapScrtpi from "@components/MapScript/MapScript";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Head from "next/head";
import Load from "@components/Load";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>绿链数能综合服务系统</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <MapScrtpi></MapScrtpi>
      <MyContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Load></Load>
      </MyContextWrapper>
    </div>
  );
}

export default MyApp;
