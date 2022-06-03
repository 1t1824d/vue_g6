<template>
  <div>
    <!-- 创建容器 -->
    <div id="container"></div>
  </div>
</template>
<script>
import G6 from "@antv/g6";
import insertCss from "insert-css";

export default {
  mounted() {
    this.InitFun();
  },
  methods: {
    async InitFun() {
      const graph = new G6.Graph({
        container: "container", // 指定挂载容器
        width: 900, // 图的宽度
        height: 800, // 图的高度
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
        fitView: true, // 开启画布自适应。开启后图自动适配画布大小
        animate: true,
        fitViewPadding: [20, 40, 50, 20],
          preventOverlap: true, // 防止节点重叠
      // ...                   // 图的其他配置
  // 节点在默认状态下的样式配置（style）和其他配置
  defaultNode: {
    size: 30, // 节点大小
    // ...                 // 节点的其他配置
    // 节点样式配置
    style: {
      fill: 'steelblue', // 节点填充色
      stroke: '#666', // 节点描边色
      lineWidth: 1, // 节点描边粗细
    },
    // 节点上的标签文本配置
    labelCfg: {
      // 节点上的标签文本样式配置
      style: {
        fill: '#fff', // 节点标签文字颜色
      },
    },
  },
  // 边在默认状态下的样式配置（style）和其他配置
  defaultEdge: {
    // ...                 // 边的其他配置
    // 边样式配置
    style: {
      opacity: 0.6, // 边透明度
      stroke: 'grey', // 边描边颜色
    },
    // 边上的标签文本配置
    labelCfg: {
      autoRotate: true, // 边上的标签文本根据边的方向旋转
    },
  },
      });
      const response = await fetch(
        "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      );
      const remoteData = await response.json();

      // ...
      graph.data(remoteData); // 加载远程数据
      graph.render(); // 渲染
    },
  },
};
</script>
</script>
<style scoped>
#container {
  width: 1520px;
  height: 856px;
}
</style>
