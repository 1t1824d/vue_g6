<template>
  <div>
    <div id="container" :style="{ height: '800px', width: '100%' }" />
  </div>
</template>
<script>
import G6 from "@antv/g6";
import FirstContentDataJson from "./data/FirstContentData.json";
import SecondContentDataJson from "./data/SecondContentData.json";
import ThirdContentDataJson from "./data/ThirdContentData.json";
import FourContentDataJson from "./data/FourContentData.json";
import ListDataJson from "./data/ListData.json";
export default {
  data() {
    return {
      treedata:ListDataJson,
    };
  },
  mounted() {
    this.showChart();
  },
  methods: {
    //生成树图
    showChart() {
      const data = this.treedata;
      const container = document.getElementById("container");
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const graph = new G6.Graph({
          // 图的DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。
          container: container,
          width: width,
          height: height,
          // 设置画布的模式 包含default 模式和 edit 模式
          modes: {
            // default 模式中包含点击选中节点行为和拖拽画布行为
            default: [
              {
                type: "collapse-expand",
                trigger: "click",
              },
              // 拖拽画布 和 缩放画布
              "drag-canvas",
              "zoom-canvas",
            ],
          },
          // 默认的节点设置
          defaultNode: {
            //节点的大小
            size: 14,
            // 指定边连入节点的连接点的位置
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
            // 节点样式
            style: {
              fill: "#C6E5FF",
              stroke: "#5B8FF9",
            },
          },
          // 默认的配置
          defaultEdge: {
            type: "cubic-horizontal",
            style: {
              stroke: "#A3B1BF",
            },
          },
          // layout: {
          //   type: "compactBox",
          //   direction: "LR",
          //   // 指定节点 ID
          //   getId: function getId(d) {
          //     return d.Id;
          //   },
          //   // 指定节点高度
          //   getHeight: function getHeight() {
          //     return 16;
          //   },
          //   //指定节点宽度
          //   getWidth: function getWidth() {
          //     return 16;
          //   },
          //   // 指定节点之间的垂直间距
          //   getVGap: function getVGap() {
          //     return 10;
          //   },
          //   // 指定节点之间的水平间距
          //   getHGap: function getHGap() {
          //     return 100;
          //   },
          // },
        });

        // 为不同节点进行不同的配置 必须在 render 之前调用
        graph.node(function (node) {
          return {
            style: {
              fill: node.Depth == 2 && node.Status ? "#c1422b" : "#c6e5ff",
              stroke: node.Depth == 2 && node.Status ? "#c1422b" : "#6b9bfa",
            },
            //String 类型。标签文本的文字内容
            label: node.Label,
            labelCfg: {
              // 文本的偏移
              offset: 10,
              // 文本相对于节点的位置
              position:
                node.Children && node.Children.length > 0 ? "left" : "right",
              //文本样式
              style: {
                fill: node.Depth == 2 && node.Status ? "#c1422b" : "#2c3e50",
              },
            },
          };
        });
        //初始化数据
        graph.data(data);
        //渲染视图
        graph.render();
        //让画布内容适应视口
        graph.fitView();
      }
    },
  },
};
</script>

