import type { NextPage } from "next";
import styles from "./Header.module.sass";
import { Dropdown, MenuProps, Modal, Space } from "antd";
import { Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MyContext } from "@components/MyContext/MyContext";
import { login_Status } from "types/types";
import Link from "next/link";
import { getLoc, removeLoc, setLoc, setQuery } from "@public/index";
import { GET_ALL_PARK_LIST_API } from "@request/apis";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const navitems: MenuProps["items"] = [
  {
    label: "园区碳总览",
    icon: <img src="/images/Vector-1.png"></img>,
    key: "/",
  },
  {
    label: "园区碳足迹",
    icon: <img src="/images/Vector-2.png"></img>,
    key: "/parkFootprint",
  },
  {
    label: "企业碳足迹",
    icon: <img src="/images/Vector-3.png"></img>,
    key: "/enterpriseFootprint",
  },
];

const Header: NextPage = (req, res) => {
  const router = useRouter();
  const [current, setCurrent] = useState("/");
  const [isModalVisible, setisModalVisible] = useState(false);
  const { state, dispatch } = useContext(MyContext) as any;
  const { loginStatus, userName,parkId } = state;
  let [parkList, setParkList] = useState<ItemType[]>([
    {
      key: "0",
      label:
        loginStatus === login_Status.login ? (
          <span onClick={() => setisModalVisible(true)}>退出登录</span>
        ) : (
          <span>
            <Link href={"/login"}>前往登录</Link>
          </span>
        ),
    },
  ]);
  const dropdownItems = <Menu items={parkList} />;

  /** 退出登录*/
  const loginOut = () => {
    dispatch({
      type: "UPDATE_LOGIN_STATUS",
      payload: login_Status.notLogin,
    });
    removeLoc("token");
    router.push("/login");
  };

  /**切换右上角的园区名称和园区ID*/
  const setpark = (id: number, name: string) => {
    dispatch({
      type: "UPDATE_PARK_ID",
      payload: id,
    });
    dispatch({
      type: "UPDATE_USER_NAME",
      payload: name,
    });
  };
  /**切换园区ID*/
  const setParkId = (parkId: number, name: string) => {
    setpark(parkId, name);
  };

  /**获取园区列表*/
  const getAllParkList = async () => {
    let res = await GET_ALL_PARK_LIST_API();
    let parkList = res.data.map((item) => {
      return {
        key: item.id,
        label: (
          <span onClick={() => setParkId(item.id, item.name)}>{item.name}</span>
        ),
      };
    });
    parkList.push({
      key: 0,
      label: <span onClick={() => setisModalVisible(true)}>退出登录</span>,
    });
    setParkList([...parkList]);
    const activePark = parkList.find((item) => item.key == parkId);
    if(activePark){
      dispatch({
          type: "UPDATE_USER_NAME",
          payload: activePark.label.props.children,
        })
    }
    

  };

  useEffect(() => {
    if (loginStatus === login_Status.login) {
      getAllParkList();
     
      
      
      // dispatch({
      //   type: "UPDATE_USER_NAME",
      //   payload: getLoc("userName"),
      // })
    }
  }, [loginStatus]);

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router.pathname]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="/images/logo.png" alt="" />
        <div className={styles.logoTextBox}>
          <img src="/images/logoText.png" alt="" />
          <span>可信绿色数据服务平台</span>
        </div>
      </div>
      <Menu
        onClick={(e) => {
          router.push(e.key);
          setCurrent(e.key);
        }}
        selectedKeys={[current]}
        mode="horizontal"
        items={navitems}
      />
      <div>
        <Dropdown overlay={dropdownItems}>
          <Space>
            <div>
              <span>{userName}</span>
              <img
                className={styles.avatar}
                src="/images/Ellipse2.png"
                alt=""
              />
              <img className={styles.Vector} src="/images/Vector.png" alt="" />
            </div>
          </Space>
        </Dropdown>
      </div>

      <Modal
        title="提示"
        visible={isModalVisible}
        cancelText="取消"
        okText="确定"
        onCancel={() => setisModalVisible(false)}
        onOk={loginOut}
      >
        <p>确定退出登录吗？</p>
      </Modal>
    </div>
  );
};

export default Header;
