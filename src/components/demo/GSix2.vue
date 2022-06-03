<template>
  <div>
    <!-- 创建容器 -->
    <div id="mountNode2"></div>
  </div>
</template>
<script>
import G6 from "@antv/g6";

export default {
  mounted() {
    // 定义数据源
    const data = {
      // 点集
      nodes: [
        {
          id: "node1",
          x: 100,
          y: 200,
        },
        {
          id: "node2",
          x: 300,
          y: 200,
        },
      ],
      // 边集
      edges: [
        // 表示一条从 node1 节点连接到 node2 节点的边
        {
          source: "node1",
          target: "node2",
        },
      ],
    };

    // 创建 G6 图实例
    const graph = new G6.Graph({
      container: "mountNode", // 指定图画布的容器 id
      // 画布宽高
      width: 800,
      height: 500,
    });
    // 读取数据
    graph.data(data);
    // 渲染图
    graph.render();
  },
};
</script>
</script>
<style scoped>
#mountNode2 {
  width: 1520px;
  height: 856px;
}
</style>
