import { useEffect, useRef, useState } from "react";

function Mymap({
  longitude,
  latitude,
  title
}) {
  let [text, setText] = useState("321123");
  const mapRef = useRef(null);
  const [mapDom, setMapDom] = useState(null);
  const [mark, setMark] = useState(null);
  function setMap() {
    //初始化地图
    let center = new TMap.LatLng(latitude, longitude)
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    let map = new TMap.Map(document.getElementById('mapRef'), {
      disableDefaultUI: true,
      center: center,//设置地图中心点坐标
      zoom: 16,   //设置地图缩放级别
      maxZoom: 15,
      baseMap: {  // 设置卫星地图
        type: 'satellite',
        features: ['base', 'building2d']
      },
    });
    let mark = new TMap.MultiMarker({
      map: map,
      enableDefaultStyle: false,
      styles: {
        // 点标记样式
        'myStyle': new TMap.MarkerStyle({
          width: 20, // 样式宽
          height: 30, // 样式高
          anchor: { x: 10, y: 30 }, // 描点位置
          src: "/images/mark.png", // 样式图片
          size: 16, //文字大小
          color: '#333', //文字颜色
          strokeWidth: 2, //文字描边宽度
          strokeColor: '#fff', //文字描边颜色
          direction: 'bottom', //文字相对于图片的位置
        }),
      },
      geometries: [
        // 点标记数据数组
        {
          // 标记位置(纬度，经度，高度)
          position: center,
          id: "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: 'myStyle',  //指定样式id
          content: title
        },
      ],
    });
    setMapDom(map);
    setMark(mark);


  }
  useEffect(() => {
    setMap();
  }, []);


  useEffect(() => {
    if (mark == null || mapDom == null) {
      return
    } else {
      let center = new TMap.LatLng(latitude, longitude)
      mapDom.setCenter(center);
      mark.setGeometries([
        {
          position: center,
          id: "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: 'myStyle',  //指定样式id
          content: title
        }
      ])
    }
  }, [longitude, latitude, title])
  return (
    <div
      id="mapRef"
      className="Mymap"
      ref={mapRef}
    ></div>
  )
}
export default Mymap;