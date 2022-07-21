import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {  park_Info, park_Statistics } from "types/types";
// import { utils, writeFile } from "xlsx";

interface xlsxData {
  prakInfo: park_Info["data"];
  parkStatistics: park_Statistics["data"];
}

const exportXLSX = ( name: string, domName: string) => {
  const element = document.getElementById(domName) as HTMLElement; // 这个dom元素是要导出的pdf的div容器
  const w = element.offsetWidth; // 获得该容器的宽
  const h = element.offsetHeight; // 获得该容器的高
  const offsetTop = element.offsetTop; // 获得该容器到文档顶部的距离
  const offsetLeft = element.offsetLeft; // 获得该容器到文档最左的距离
  const canvas = document.createElement("canvas");
  let abs = 0;
  const win_i = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  const win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
  if (win_o > win_i) {
    abs = (win_o - win_i) / 2; // 获得滚动条宽度的一半
  }
  canvas.width = w * 2; // 将画布宽&&高放大两倍
  canvas.height = h * 2;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.scale(2, 2);
  context.translate(-offsetLeft - abs, -offsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left()，有无滚动条的时候存在差值，因此translate的时候，要把这个差值去掉
  html2canvas(element, {
    allowTaint: true,
    scale: 2, // 提升画面质量，但是会增加文件大小
  }).then((canvas) => {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    // 一页pdf显示html页面生成的canvas高度
    const pageHeight = (contentWidth / 592.28) * 841.89;
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28;
    const imgHeight = (592.28 / contentWidth) * contentHeight;

    const pageDate = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
    // 当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageDate, "JPEG", 0, position, imgWidth, imgHeight);
    } else {
      // 分页
      while (leftHeight > 0) {
        pdf.addImage(pageDate, "JPEG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        // 避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save("你的名字.pdf");
  });
};

export default exportXLSX;
