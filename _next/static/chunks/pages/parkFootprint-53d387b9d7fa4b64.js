(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{53370:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/parkFootprint",function(){return c(30903)}])},64987:function(d,b,a){"use strict";var e=a(85893),f=a(80421),g=a(67294),c=a(46505),h=a.n(c),i=[{label:"\u672C\u5468",id:"0"},{label:"\u6708\u5EA6",id:"1"},{label:"\u5E74\u5EA6",id:"2"},];b.Z=function(a){var l=function(){var a=f.JE(k.current);(r=a||f.S1(k.current)).setOption(s)},m=function(){return r.resize()},n=function(a,b){var c=null;return function(){null!==c&&clearTimeout(c),c=setTimeout(a,b)}},o=function(){window.addEventListener("resize",n(m,500))},b=a.park_name,j=(a.toDay_data,a.park_xAxisData),c=a.park_carbonEquivalent,d=a.park_emissionLoad,p=a.setTimeType,q=a.timeType,k=(0,g.useRef)(null),r=null,s={title:{text:b,subtext:"(kgCO2e)"},grid:{left:"5%",right:"5%",bottom:"8%"},xAxis:{type:"category",boundaryGap:!1,data:j},yAxis:{type:"value"},legend:{data:["\u78B3\u6392\u653E\u91CF","\u57FA\u51C6\u6392\u653E\u91CF"]},series:[{name:"\u78B3\u6392\u653E\u91CF",data:c,type:"line",smooth:!0,areaStyle:{}},{name:"\u57FA\u51C6\u6392\u653E\u91CF",data:d,type:"line",smooth:!0,areaStyle:{}},]};return(0,g.useEffect)(function(){return l(),o(),function(){r&&r.dispose()}},[c,d,b]),(0,e.jsxs)("div",{className:h().LineChart,style:{textAlign:"center"},children:[(0,e.jsx)("div",{ref:k,style:{height:"370px",width:"100%"}}),(0,e.jsx)("div",{className:h().timeType,children:i.map(function(a,b){return(0,e.jsx)("span",{className:a.id===q?h().active:"",onClick:function(){p(a.id)},children:a.label},b)})})]})}},1787:function(d,b,a){"use strict";var e=a(85893),c=a(41853),f=a.n(c);b.Z=function(a){var b=a.title,c=a.iconImg,d=a.time,g=a.emissions,h=a.appendButto,i=a.linkFun;return(0,e.jsxs)("div",{className:f().miniCardBox,onClick:i,children:[(0,e.jsxs)("div",{className:f().miniCardIconBox,children:[(0,e.jsx)("img",{src:c,alt:""}),(0,e.jsx)("span",{children:b})]}),(0,e.jsxs)("div",{className:f().miniCardTimeBox,children:[(0,e.jsx)("span",{className:f().tipsTitle,children:"\u65E5\u671F"}),(0,e.jsxs)("span",{className:f().miniCardIconBox,children:[(0,e.jsx)("img",{src:"/images/icon-time.png",alt:""}),(0,e.jsx)("span",{className:f().time,children:d})]})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:f().tipsTitle,children:"\u78B3\u6392\u653E\u91CF"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:f().emissions,children:g}),(0,e.jsx)("span",{className:"goldenlabel",children:"kgCO2e"})]})]}),h]})}},37234:function(d,b,a){"use strict";var e=a(85893),c=a(91276),f=a.n(c);b.Z=function(a){var b=a.parkName,c=a.parkLoc,d=a.parktype,g=a.parknum,h=a.area;return(0,e.jsxs)("div",{className:f().ParkCard,children:[(0,e.jsx)("img",{className:f().industry,src:"/images/industry.png",alt:""}),(0,e.jsxs)("div",{className:f().parkInfoBox,children:[(0,e.jsx)("span",{className:f().parkName,children:b}),(0,e.jsx)("span",{className:f().parkLoc,children:c}),(0,e.jsxs)("div",{className:f().parkInfoItem,children:[(0,e.jsxs)("div",{className:f().phoneRow,children:[(0,e.jsx)("span",{className:f().parkInfoTitle,children:"\u7C7B\u578B"}),(0,e.jsx)("span",{className:f().parkInfoCentent,children:d})]}),(0,e.jsxs)("div",{className:f().phoneRow,children:[(0,e.jsx)("span",{className:f().parkInfoTitle,children:"\u4F01\u4E1A\u6570"}),(0,e.jsx)("span",{className:f().parkInfoCentent,children:g})]}),(0,e.jsxs)("div",{className:f().phoneRow,children:[(0,e.jsx)("span",{className:f().parkInfoTitle,children:"\u9762\u79EF"}),(0,e.jsx)("span",{className:f().parkInfoCentent,children:h}),(0,e.jsx)("div",{className:"goldenlabel",children:"\u5E73\u65B9\u516C\u91CC"})]})]})]})]})}},3261:function(d,b,a){"use strict";var e=a(85893),c=a(62623),f=a.n(c);b.Z=function(a){var b=a.total,c=a.addOrsub,d=a.deviation;return(0,e.jsxs)("div",{className:f().TotalCountBox,children:[(0,e.jsx)("span",{className:"TotalCountTitle",children:"\u56ED\u533A\u672C\u5E74\u5EA6\u78B3\u6392\u653E\u603B\u91CF"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:"TotalCountNum",children:b}),(0,e.jsx)("span",{className:"goldenlabel",children:"kgCO2e"})]}),(0,e.jsx)("div",{className:f().line}),(0,e.jsxs)("div",{children:[(0,e.jsxs)("span",{className:f().addOrsub,children:["\u6BD4\u53BB\u5E74",c?"\u589E\u52A0":"\u51CF\u5C11"]}),(0,e.jsx)("span",{className:f().deviation,children:d})]})]})}},30903:function(f,b,a){"use strict";a.r(b),a.d(b,{default:function(){return G}});var g=a(47568),h=a(29815),c=a(34051),i=a.n(c),j=a(85893),k=a(64987),l=a(1787),m=a(37234),n=a(3261),o=a(67294),p=function(a){var d=a.longitude,e=a.latitude,b=a.title,f=function(){var a=new TMap.LatLng(e,d),c=new TMap.Map(document.getElementById("mapRef"),{disableDefaultUI:!0,center:a,zoom:17,baseMap:{type:"satellite",features:["base","building2d"]}});new TMap.MultiMarker({map:c,enableDefaultStyle:!1,styles:{myStyle:new TMap.MarkerStyle({width:20,height:30,anchor:{x:10,y:30},src:"/images/mark.png",size:16,color:"#333",strokeWidth:2,strokeColor:"#fff",direction:"bottom"})},geometries:[{position:a,id:"1",styleId:"myStyle",content:b},]})},c=(0,o.useRef)(null);return(0,o.useEffect)(function(){f()},[b]),(0,j.jsx)("div",{id:"mapRef",className:"Mymap",ref:c})},q=a(26303),r=function(a){var b=a.rows,c=a.bc;return(0,j.jsx)("div",{style:{background:void 0===c?"#fff":c,padding:"20px 40px 10px",borderRadius:"20px",margin:"20px 0"},children:(0,j.jsx)(q.Z,{active:!0,paragraph:{rows:void 0===b?3:b}})})},d=a(61120),s=a.n(d),t=a(91819),u=function(l,g){var a=document.getElementById(g),h=a.offsetWidth,i=a.offsetHeight,j=a.offsetTop,k=a.offsetLeft,b=document.createElement("canvas"),c=0,d=document.body.clientWidth,e=window.innerWidth;e>d&&(c=(e-d)/2),b.width=2*h,b.height=2*i;var f=b.getContext("2d");f.scale(2,2),f.translate(-k-c,-j),s()(a,{allowTaint:!0,scale:2}).then(function(b){var e=b.width,f=b.height,g=e/592.28*841.89,c=f,d=0,h=592.28/e*f,i=b.toDataURL("image/jpeg",1),a=new t.ZP({unit:"pt",format:"a4"});if(c<g)a.addImage(i,"JPEG",0,d,595.28,h);else for(;c>0;)a.addImage(i,"JPEG",0,d,595.28,h),d-=841.89,(c-=g)>0&&a.addPage();a.save("\u4F60\u7684\u540D\u5B57.pdf")})},v=a(98542),w=a(82071),x=a(32808),y=a(2885),e=a(33540),z=a.n(e),A={id:0,name:"\u6210\u90FD\u56ED\u533A",area:"58000",num:0,address:"\u6210\u90FD\u5E02\u9AD8\u65B0\u533A",emissionLoad:"",region:"",type:"\u5DE5\u4E1A\u56ED\u533A",reduce:""},B=[{id:0,name:"\u5DE5\u4E1A\u7528\u7535",emissionLoad:"1548.154",carbonEquivalent:"2266",startTime:"2022/7/11"},{id:1,name:"\u4EA4\u901A\u7528\u7535",emissionLoad:"1548.154",carbonEquivalent:"2266",startTime:"2022/7/11"},],C=function(c){var d=c.typeOptions,e=v.Z.RangePicker,a=(0,o.useState)(!1),f=a[0],h=a[1],b=(0,o.useState)(!1),g=b[0],i=b[1],k=function(){u("","pdfDOM")},l=function(){h(!0)};return(0,j.jsxs)("div",{children:[(0,j.jsxs)("div",{className:"m24 flex jcsbcentennt",children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{className:"pageTitle",children:"\u6BCF\u65E5\u57FA\u7840\u6570\u636E "}),(0,j.jsx)("span",{className:"mr5",children:" \u751F\u6210\u4F9D\u636E "}),(0,j.jsx)("span",{className:"blueTip",children:"2016\u5E74\u78B3\u6392\u653E\u6807\u51C6\u89C4\u8303\u6807\u51C6"})]}),(0,j.jsx)("button",{onClick:function(){return l()},children:"\u67E5\u770B\u62A5\u544A"})]}),(0,j.jsxs)(w.Z,{title:"\u9009\u62E9\u62A5\u544A",visible:f,onOk:function(){h(!1),i(!0)},onCancel:function(){return h(!1)},cancelText:"\u53D6\u6D88",okText:"\u786E\u5B9A",children:[(0,j.jsx)("div",{style:{margin:"0 0 40px 0"},children:(0,j.jsx)(x.Z.Group,{options:d,defaultValue:[]})}),(0,j.jsx)(y.Z,{direction:"vertical",size:12,children:(0,j.jsx)(e,{})})]}),(0,j.jsx)(w.Z,{title:"\u9884\u89C8",centered:!0,visible:g,width:1e3,bodyStyle:{height:"50vh",overflowY:"scroll"},onOk:function(){return k()},onCancel:function(){return i(!1)},okText:"\u5BFC\u51FA",cancelText:"\u53D6\u6D88",children:(0,j.jsx)("div",{id:"pdfDOM",children:(0,j.jsxs)("div",{className:z().pdfBox,children:[(0,j.jsx)("div",{className:z().title,children:"\u57FA\u672C\u4FE1\u606F"}),(0,j.jsxs)("div",{className:z().infoBox,children:[(0,j.jsx)("span",{children:"\u56ED\u533A/\u4F01\u4E1A\u540D\u79F0 "}),(0,j.jsx)("span",{children:A.name})]}),(0,j.jsxs)("div",{className:z().infoBox,children:[(0,j.jsx)("span",{children:"\u7C7B\u578B"}),(0,j.jsx)("span",{children:A.type})]}),(0,j.jsxs)("div",{className:z().infoBox,children:[(0,j.jsx)("span",{children:"\u5E74\u4EFD"}),(0,j.jsx)("span",{children:A.emissionLoad})]}),(0,j.jsxs)("div",{className:z().infoBox,children:[(0,j.jsx)("span",{children:"\u5730\u5740"}),(0,j.jsx)("span",{children:A.address})]}),(0,j.jsx)("div",{className:z().title,children:"\u6392\u653E\u4FE1\u606F"}),B.map(function(a,b){return(0,j.jsxs)("div",{className:z().infoBox,children:[(0,j.jsx)("span",{children:a.name}),(0,j.jsx)("span",{children:a.emissionLoad})]},b)}),(0,j.jsx)("div",{className:z().title,children:"\u660E\u7EC6"}),(0,j.jsxs)("div",{className:z().details,children:[(0,j.jsx)("span",{}),(0,j.jsx)("span",{className:z().name,children:"\u80FD\u6E90\u540D\u79F0"}),(0,j.jsx)("span",{children:"\u6D88\u8D39\u91CF\uFF08KWH\uFF09"}),(0,j.jsx)("span",{children:"CO2\u6392\u653E\u56E0\u5B50 \uFF08kgCO2/KWH\uFF09"}),(0,j.jsx)("span",{children:"CO2\u6392\u653E\u91CF\uFF08kg\uFF09"})]})]})})})]})},D=a(11163),E=a(78676),F=a(76109),G=function(){var A,B,G,P=(0,D.useRouter)(),b=(0,o.useContext)(F.I),H=b.state,Q=b.dispatch,I=H.parkId,c=(0,o.useState)(!0),d=c[0],R=c[1],e=(0,o.useState)(!0),J=e[0],S=e[1],f=(0,o.useState)(!0),K=f[0],T=f[1],q=(0,o.useState)("1"),L=q[0],U=q[1],s=(0,o.useState)({id:0,name:"\u6682\u65E0\u4FE1\u606F",area:"",num:0,address:"\u6682\u65E0\u4FE1\u606F",emissionLoad:"0",region:"\u6682\u65E0\u4FE1\u606F",type:"\u6682\u65E0\u4FE1\u606F",reduce:"0.00",location:{coordinates:[0,0],type:"Point"}}),a=s[0],V=s[1],t=(0,o.useState)([{id:0,title:"\u6682\u65E0\u6D88\u606F",iconImg:"/images/Group.png",time:"\u6682\u65E0\u4FE1\u606F",emissions:"0.00"},]),u=t[0],W=t[1],v=(0,o.useState)([]),M=v[0],X=v[1],w=(0,o.useState)([]),N=w[0],Y=w[1],x=(0,o.useState)([]),O=x[0],Z=x[1],y=(0,o.useState)({latitude:30.572961,longitude:104.066301}),z=y[0],$=y[1],_=function(a){P.push("/parkFootprint/info"),Q({type:"UPDATE_TYPE_ID",payload:a})},aa=(A=(0,g.Z)(i().mark(function a(b){var c;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return R(!1),a.prev=1,a.next=4,(0,E.dC)(b);case 4:V((c=a.sent).data),$({latitude:c.data.location.coordinates[1],longitude:c.data.location.coordinates[0]}),a.next=11;break;case 9:a.prev=9,a.t0=a.catch(1);case 11:R(!0);case 12:case"end":return a.stop()}},a,null,[[1,9]])})),function(a){return A.apply(this,arguments)}),ab=(B=(0,g.Z)(i().mark(function a(b,c){var d,e,f,g;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return S(!1),a.prev=1,a.next=4,(0,E.rX)(b,c);case 4:d=a.sent,e=[],f=[],g=[],d.data.forEach(function(a){e.push(a.startTime),f.push(a.carbonEquivalent),g.push(a.emissionLoad)}),X((0,h.Z)(e)),Y((0,h.Z)(f)),Z((0,h.Z)(g)),a.next=16;break;case 14:a.prev=14,a.t0=a.catch(1);case 16:S(!0);case 17:case"end":return a.stop()}},a,null,[[1,14]])})),function(a,b){return B.apply(this,arguments)}),ac=(G=(0,g.Z)(i().mark(function a(b){var c,d;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return T(!1),a.prev=1,a.next=4,(0,E.Fe)(b);case 4:d=(c=a.sent).data.map(function(a){return{id:a.id,title:a.name,emissions:a.emissionLoad,time:a.startTime,iconImg:"/images/Group.png"}}),W((0,h.Z)(d)),a.next=11;break;case 9:a.prev=9,a.t0=a.catch(1);case 11:T(!0);case 12:case"end":return a.stop()}},a,null,[[1,9]])})),function(a){return G.apply(this,arguments)}),ad=function(a){U(a),ab(I,a)};return(0,o.useEffect)(function(){I&&(aa(I),ab(I,L),ac(I))},[I]),(0,j.jsxs)("div",{className:"parkFootprint",children:[(0,j.jsxs)("div",{className:"topCardBox",children:[(0,j.jsx)("div",{className:"parkcard-box",children:d?(0,j.jsx)(m.Z,{parkName:a.name,parkLoc:a.address,parktype:a.type,parknum:a.num,area:a.area}):(0,j.jsx)(r,{})}),(0,j.jsx)("div",{className:"TotalCount-box",children:d?(0,j.jsx)(n.Z,{total:a.emissionLoad,addOrsub:!1,deviation:a.reduce}):(0,j.jsx)(r,{})})]}),(0,j.jsx)("div",{className:"lineChartBox",children:J?(0,j.jsx)(k.Z,{park_name:a.name,toDay_data:0,park_xAxisData:M,park_carbonEquivalent:N,park_emissionLoad:O,setTimeType:function(a){return ad(a)},timeType:L}):(0,j.jsx)(r,{rows:8})}),"\u6682\u65E0\u4FE1\u606F"!==a.name?(0,j.jsx)(p,{longitude:z.longitude,latitude:z.latitude,title:a.name}):(0,j.jsx)(p,{longitude:"104.066301",latitude:"30.572961",title:"\u6682\u65E0\u4FE1\u606F"}),(0,j.jsx)("div",{children:K?(0,j.jsx)("div",{children:u.map(function(a,b){return(0,j.jsx)(l.Z,{id:a.id,linkFun:function(){return _(a.id)},time:a.time,title:a.title,iconImg:a.iconImg,emissions:a.emissions},b.toString())})}):(0,j.jsx)(r,{rows:8})}),(0,j.jsx)(C,{typeOptions:u.map(function(a,b){return{label:a.title,value:a.id}})})]})}},46505:function(a){a.exports={LineChart:"LineChart_LineChart__Aob38",timeType:"LineChart_timeType__FZF3K",active:"LineChart_active__uFqeL"}},41853:function(a){a.exports={miniCardBox:"MiniCard_miniCardBox__xp_Fm",miniCardIconBox:"MiniCard_miniCardIconBox__3nV6z",miniCardTimeBox:"MiniCard_miniCardTimeBox__VKPKA",time:"MiniCard_time__rdUA_",tipsTitle:"MiniCard_tipsTitle__cvHtI",emissions:"MiniCard_emissions__svKgw"}},91276:function(a){a.exports={ParkCard:"ParkCard_ParkCard__rbIlc",industry:"ParkCard_industry___Y4lP",parkInfoBox:"ParkCard_parkInfoBox__7THyj",parkName:"ParkCard_parkName__lMNh3",parkLoc:"ParkCard_parkLoc__ymXFg",parkInfoItem:"ParkCard_parkInfoItem__at1Dn",parkInfoTitle:"ParkCard_parkInfoTitle__bM2VG",parkInfoCentent:"ParkCard_parkInfoCentent__6rCmn",box:"ParkCard_box__qGLJc",phoneRow:"ParkCard_phoneRow__xCYZB"}},62623:function(a){a.exports={TotalCountBox:"TotalCount_TotalCountBox__jGImy",line:"TotalCount_line__cQk1g",addOrsub:"TotalCount_addOrsub__zxQ_c",deviation:"TotalCount_deviation__WCt66"}},33540:function(a){a.exports={pdfBox:"exportPdf_pdfBox__k2MHY",title:"exportPdf_title___DBbW",infoBox:"exportPdf_infoBox__AUq39",details:"exportPdf_details__eCTS1",name:"exportPdf_name__GI03D"}}},function(a){a.O(0,[885,847,443,421,563,774,888,179],function(){var b;return a(a.s=53370)}),_N_E=a.O()}])