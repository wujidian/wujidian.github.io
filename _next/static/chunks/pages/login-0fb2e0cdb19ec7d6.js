(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{83236:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return c(69729)}])},69729:function(f,b,a){"use strict";a.r(b);var g=a(47568),c=a(34051),h=a.n(c),i=a(85893),d=a(37011),j=a.n(d),k=a(78676),l=a(67294),m=a(40123),n=a(11588),e=a(11163),o=a.n(e),p=a(76109),q=a(98919),r=function(c){var a=c.account,b=c.password;if(!a||!b)return a||n.ZP.error("\u8BF7\u8F93\u5165\u8D26\u6237"),b||n.ZP.error("\u8BF7\u8F93\u5165\u5BC6\u7801"),!1;var d=/^[a-zA-Z0-9]{6,}$/;return!!(d.test(a)&&d.test(b))||(n.ZP.error("\u8BF7\u8F93\u5165\u6B63\u786E\u683C\u5F0F\u7684\u7684\u8D26\u53F7\u5BC6\u7801"),!1)};b.default=function(){var s,t,u,b=(0,l.useState)(""),v=b[0],B=b[1],c=(0,l.useState)(""),w=c[0],C=c[1],d=(0,l.useState)(""),x=d[0],D=d[1],e=(0,l.useState)(m.u.login),a=e[0],E=e[1],f=(0,l.useContext)(p.I),F=(f.state,f.dispatch),y=(s=(0,g.Z)(h().mark(function a(){return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r({account:v,password:w})){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,(0,k.Ui)({account:v,password:w});case 4:n.ZP.success("\u6CE8\u518C\u6210\u529F"),E(m.u.login);case 6:case"end":return a.stop()}},a)})),function(){return s.apply(this,arguments)}),z=(t=(0,g.Z)(h().mark(function a(){var b;return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r({account:v,password:w})){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,(0,k.C2)({account:v,password:w});case 4:b=a.sent,console.log(b.data.token),n.ZP.success("\u767B\u5F55\u6210\u529F"),F({type:"UPDATE_LOGIN_STATUS",payload:m.P.login}),F({type:"UPDATE_USER",payload:{name:"\u6B22\u8FCE",img:"/images/Ellipse2.png"}}),(0,q.$0)("token",b.data.token),setTimeout(function(){o().push("/")},1e3);case 11:case"end":return a.stop()}},a)})),function(){return t.apply(this,arguments)}),A=(u=(0,g.Z)(h().mark(function a(){return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r({account:v,password:w})){a.next=2;break}return a.abrupt("return");case 2:n.ZP.error("\u6682\u4E0D\u652F\u6301\u91CD\u7F6E\u5BC6\u7801");case 3:case"end":return a.stop()}},a)})),function(){return u.apply(this,arguments)});return(0,i.jsxs)("div",{className:j().loginBc,children:[(0,i.jsxs)("div",{className:j().logoBox,children:[(0,i.jsx)("img",{src:"/images/logo2.png",alt:""}),(0,i.jsx)("div",{className:j().line}),(0,i.jsx)("h2",{children:"\u53EF\u4FE1\u7EFF\u8272\u6570\u636E\u670D\u52A1\u5E73\u53F0"})]}),(0,i.jsx)("div",{className:j().loginPage,children:(0,i.jsxs)("div",{className:j().loginForm,children:[(0,i.jsxs)("h2",{children:["\u7EFF\u8272\u78B3\u94FE \xb7"," ",a===m.u.login?"\u8D26\u6237\u767B\u5F55":a===m.u.register?"\u8D26\u6237\u6CE8\u518C":"\u91CD\u7F6E\u5BC6\u7801"]}),(0,i.jsx)("input",{className:"login-input",value:v,onChange:function(a){B(a.target.value)},placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",type:"text"}),(0,i.jsx)("input",{className:"login-input",type:"password",value:w,onChange:function(a){C(a.target.value)},placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801"}),a===m.u.login?"":(0,i.jsx)("input",{className:"login-input",type:"password",value:x,onChange:function(a){D(a.target.value)},placeholder:"\u8BF7\u786E\u8BA4\u5BC6\u7801"}),a===m.u.register?(0,i.jsx)("button",{onClick:y,className:j().loginBtn,children:"\u6CE8\u518C"}):a===m.u.login?(0,i.jsx)("button",{onClick:z,className:j().loginBtn,children:"\u767B\u5F55"}):(0,i.jsx)("button",{onClick:A,className:j().loginBtn,children:"\u91CD\u7F6E\u5BC6\u7801"}),(0,i.jsxs)("div",{className:j().checkOutLoginType,children:[(0,i.jsx)("span",{onClick:function(){return E(m.u.resetPassword)},children:"\u5FD8\u8BB0\u5BC6\u7801\uFF1F"}),(0,i.jsx)("span",{onClick:function(){return E(a==m.u.login?m.u.register:m.u.login)},children:a==m.u.login?"\u8D26\u6237\u6CE8\u518C":"\u8D26\u6237\u767B\u5F55"})]})]})})]})}},37011:function(a){a.exports={loginBc:"login_loginBc__EUPXh",logoBox:"login_logoBox__uyyIQ",line:"login_line__aPCGn",loginPage:"login_loginPage__r5sle",loginForm:"login_loginForm__fug5d",loginBtn:"login_loginBtn__JW_aV",checkOutLoginType:"login_checkOutLoginType__3CokT"}}},function(a){a.O(0,[774,888,179],function(){var b;return a(a.s=83236)}),_N_E=a.O()}])