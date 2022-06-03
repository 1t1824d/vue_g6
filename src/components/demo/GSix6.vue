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
      treedata: ListDataJson,
    };
  },
  mounted() {
    this.showChart();
  },
  methods: {
    //生成树图
    showChart() {
    //fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
   // fetch('/api/algorithm-category')
  ///.then((res) => res.json())
  this.$axios.post("/api/algorithm-category")
  .then((res) => res.data)
  .then((data) => {
    const container = document.getElementById('container6');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.getModel();
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });

    },
  },
};
</script>

