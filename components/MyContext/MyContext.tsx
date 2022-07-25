import { getLoc } from "@public/index";
import router from "next/router";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { login_Status } from "../../types/types";

// const initialState = {
//   loginStatus: getLoc("token") ? login_Status.login : login_Status.notLogin,
//   userName: getLoc("token") ? "欢迎" : "尚未登录",
//   parkId: getLoc("parkId") ? getLoc("parkId") : "0",
//   parkFootprintInfoId: getLoc("parkFootprintInfoId")
//     ? getLoc("parkFootprintInfoId")
//     : "0",
//   enterpriseFootprintInfoId: getLoc("enterpriseFootprintInfoId")
//     ? getLoc("enterpriseFootprintInfoId")
//     : "0",
//   enterpriseFootprintDetailsId: getLoc("enterpriseFootprintDetailsId")
//     ? getLoc("enterpriseFootprintDetailsId")
//     : "0",
// };

// 编写我们的 reducer，写法和 redux 的完全相同

// 生成 state 以及 dispatch
export const MyContext = createContext({});

// 将 wrapper 暴露出去
const MyContextWrapper = ({ children: children }: any) => {
  const initialState = {
    loginStatus:  login_Status.notLogin,
    userName:"尚未登录",
    parkId: "0",
    parkFootprintInfoId: "0",
    enterpriseFootprintInfoId:  "0",
    enterpriseFootprintDetailsId: "0",
  }
  function reducer(state = initialState, action: any) {
    const { type, payload } = action || {};
    switch (type) {
      case "UPDATE_LOGIN_STATUS":
        return {
          ...state,
          loginStatus: payload,
        };
      case "userName":
        return {
          ...state,
          userName: payload,
        };
      case "UPDATE_PARK_ID":
        return {
          ...state,
          parkId: payload,
        };
      case "UPDATE_PARK_FOOTPRINT_INFO_ID":
        return {
          ...state,
          parkFootprintInfoId: payload,
        };
      case "UPDATE_ENTERPRISE_FOOTPRINT_INFO_ID":
        return {
          ...state,
          enterpriseFootprintInfoId: payload,
        };
      case "UPDATE_ENTERPRISE_FOOTPRINT_DETAILS_ID":
        return {
          ...state,
          enterpriseFootprintDetailsId: payload,
        };
      default:
        return state;
    }
  }
  useEffect(() => {
    const loginStatus = getLoc("token")
      ? login_Status.login
      : login_Status.notLogin;
    const userName = getLoc("token") ? "欢迎" : "尚未登录";
    const parkId = getLoc("parkId") ? getLoc("parkId") : "0";
    const parkFootprintInfoId = getLoc("parkFootprintInfoId")
      ? getLoc("parkFootprintInfoId")
      : "0";
    const enterpriseFootprintInfoId = getLoc("enterpriseFootprintInfoId")
      ? getLoc("enterpriseFootprintInfoId")
      : "0";
    const enterpriseFootprintDetailsId = getLoc("enterpriseFootprintDetailsId")
      ? getLoc("enterpriseFootprintDetailsId")
      : "0";
    dispatch({
      type: "UPDATE_LOGIN_STATUS",
      payload: loginStatus,
    })
    dispatch({
      type: "userName",
      payload: userName,
    })
    dispatch({
      type: "UPDATE_PARK_ID",
      payload: parkId,
    })
    dispatch({
      type: "UPDATE_PARK_FOOTPRINT_INFO_ID",
      payload: parkFootprintInfoId,
    })
    dispatch({
      type: "UPDATE_ENTERPRISE_FOOTPRINT_INFO_ID",
      payload: enterpriseFootprintInfoId,
    })
    dispatch({
      type: "UPDATE_ENTERPRISE_FOOTPRINT_DETAILS_ID",
      payload: enterpriseFootprintDetailsId,
    })
    
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextWrapper;
