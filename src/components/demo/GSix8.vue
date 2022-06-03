<template>
  <div class="GsixBox">
    <div id="container" :style="{ height: '100%', width: '100%' }" />
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
      this.$axios
        .post("/api/ListData")
        .then((res) => res.data[0])
        .then((data) => {
          G6.registerNode("card-node", {
            draw: function drawShape(cfg, group) {
              const r = 2;
              const color = "#5B8FF9";
              const w = cfg.size[0];
              const h = cfg.size[1];
              const shape = group.addShape("rect", {
                attrs: {
                  x: -w / 2,
                  y: -h / 2,
                  width: w, //200,
                  height: h, // 60
                  stroke: color,
                  radius: r,
                  fill: "#fff",
                },
                name: "main-box",
                draggable: true,
              });

              group.addShape("rect", {
                attrs: {
                  x: -w / 2,
                  y: -h / 2,
                  width: w, //200,
                  height: h / 2, // 60
                  fill: color,
                  radius: [r, r, 0, 0],
                },
                name: "title-box",
                draggable: true,
              });

              // title text
              group.addShape("text", {
                attrs: {
                  textBaseline: "top",
                  x: -w / 2 + 8,
                  y: -h / 2 + 2,
                  lineHeight: 20,
                  text: cfg.id,
                  fill: "#fff",
                },
                name: "title",
              });
              cfg.children &&
                group.addShape("marker", {
                  attrs: {
                    x: w / 2,
                    y: 0,
                    r: 6,
                    cursor: "pointer",
                    symbol: G6.Marker.collapse,
                    stroke: "#666",
                    lineWidth: 1,
                    fill: "#fff",
                  },
                  name: "collapse-icon",
                });
              group.addShape("text", {
                attrs: {
                  textBaseline: "top",
                  x: -w / 2 + 8,
                  y: -h / 2 + 24,
                  lineHeight: 20,
                  text: "description",
                  fill: "rgba(0,0,0, 1)",
                },
                name: `description`,
              });
              return shape;
            },
            setState(name, value, item) {
              if (name === "collapsed") {
                const marker = item
                  .get("group")
                  .find((ele) => ele.get("name") === "collapse-icon");
                const icon = value ? G6.Marker.expand : G6.Marker.collapse;
                marker.attr("symbol", icon);
              }
            },
          });
          const container = document.getElementById("container");
          const width = container.scrollWidth;
          const height = container.scrollHeight || 500;
          // 实例化 Grid 插件
          const grid = new G6.Grid();
          const minimap = new G6.Minimap();
          const graph = new G6.TreeGraph({
            container: "container",
            width,
            height,
            plugins: [grid, minimap], // 配置 Grid 插件和 Minimap 插件
            modes: {
              default: [
                {
                  type: "collapse-expand",
                  onChange: function onChange(item, collapsed) {
                    console.log("onChange---", item);

                    // const data = item.getModel();
                    // data.collapsed = collapsed;
                    collapseSibNode(item, false);

                    return true;
                  },
                },
                "drag-canvas",
              ],
            },
            defaultNode: {
              type: "card-node",
              size: [100, 40],
            },
            defaultEdge: {
              type: "cubic-horizontal",
              style: {
                endArrow: true,
               // fill: "#389",
                stroke: "#389",
              },
            },
            layout: {
              type: "indented",
              direction: "LR",
              dropCap: false,
              indent: 200,
              getHeight: () => {
                return 20;
              },
            },
          });

          graph.data(data);
          graph.render();
          graph.fitCenter();
          graph.fitView(60);

          // // 1 默认展开两层节点，之后，重新渲染
          // G6.Util.traverseTree(data, function (item) {
          //   if (item.depth > 0) {
          //     //collapsed为true时默认收起
          //     item.collapsed = true;
          //   }
          // });
          // graph.data(data);
          // graph.render();
          // graph.fitCenter();
          // graph.fitView();

          /*
           **************************** */
          /**
           * @method: 点击node节点，展开此节点，收缩其他同级节点及其所有子节点
           * @param {*} item 此节点
           * @param {*} collapsed 收缩状态
           */
          function collapseSibNode(item, collapsed) {
            let farNode = item._cfg.parent && item._cfg.parent._cfg.id;
            // 同级节点
            let siblingNode;

            // 当前有父节点
            if (farNode) {
              // 获取兄弟节点
              siblingNode = item._cfg.parent._cfg.children;
              if (siblingNode.length > 0 && siblingNode) {
                collapseNode(siblingNode);
              }
            } else {
              // 当前是根节点
              collapseNode(item._cfg.children);
            }

            // 折叠展开节点
            const data = item.get("model");

            data.collapsed = collapsed;
          }
          /**
           * @method: 递归收起节点
           * @param {*} children
           */
          function collapseNode(children) {
            children.forEach((el) => {
              const data = el.get("model");

              let isChildren = el._cfg.children && el._cfg.children.length > 0;
              if (isChildren) {
                collapseNode(el._cfg.children);
                // 先关闭子节点后关闭父节点
                data.collapsed = true;
              }
            });
          }
          /*
           **************************** */

          if (typeof window !== "undefined")
            window.onresize = () => {
              if (!graph || graph.get("destroyed")) return;
              if (
                !container ||
                !container.scrollWidth ||
                !container.scrollHeight
              )
                return;
              graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.GsixBox {
  width: 100%;
  height: 100%;
}
</style>

