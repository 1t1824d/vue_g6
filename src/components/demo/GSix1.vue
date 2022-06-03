<template>
  <div>
    <!-- 创建容器 -->
    <div id="mountNode"></div>
  </div>
</template>
<script>
import G6 from "@antv/g6";

export default {
  mounted() {
    const data = {
      label: "梯队名称展示",
      type: "rect",
      size: [300, 40],
      anchorPoints: [
        [0.5, 0],
        [0.5, 1],
      ],
      getHeight: () => {
        return 10;
      },
      getWidth: () => {
        return 150;
      },
      children: [
        {
          id: "100",
          organizationName: "所属单位-组织名称",
          postName: "岗级-岗位名称",
          peopleName: "姓名 >",
          jiugongPosition: "九宫格位置",
          jiugongValue: 7,
          successors: "继任者数",
          successorsValue: 2,
          successionReadiness: "继任准备度",
          successionReadinessValue: "A",
          colorIndex: "A",
          children: [
            {
              id: "101",
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "A",
            },
            {
              id: "102",
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "B",
            },
            {
              id: "103",
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "C",
            },
          ],
        },
        {
          organizationName: "所属单位-组织名称",
          postName: "岗级-岗位名称",
          peopleName: "姓名 >",
          jiugongPosition: "九宫格位置",
          jiugongValue: 7,
          successors: "继任者数",
          successorsValue: 2,
          successionReadiness: "继任准备度",
          successionReadinessValue: "A",
          colorIndex: "B",
        },
        {
          id: "123",
          organizationName: "所属单位-组织名称",
          postName: "岗级-岗位名称",
          peopleName: "姓名 >",
          jiugongPosition: "九宫格位置",
          jiugongValue: 7,
          successors: "继任者数",
          successorsValue: 2,
          successionReadiness: "继任准备度",
          successionReadinessValue: "A",
          colorIndex: "C",
          children: [
            {
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "A",
            },
            {
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "B",
            },
            {
              organizationName: "所属单位-组织名称",
              postName: "岗级-岗位名称",
              peopleName: "姓名 >",
              jiugongPosition: "九宫格位置",
              jiugongValue: 7,
              successors: "继任者数",
              successorsValue: 2,
              successionReadiness: "继任准备度",
              successionReadinessValue: "A",
              colorIndex: "C",
            },
          ],
        },
      ],
    };
    const colors = {
      A: "#D6F3DA",
      B: "#FDEBD3",
      C: "#D7D7D7",
    };
    // 默认配置
    const defaultConfig = {
      width: 1200,
      height: 800,
      modes: {
        default: ["zoom-canvas", "drag-canvas"],
      },
      fitView: true, // 开启画布自适应。开启后图自动适配画布大小
      animate: true,
      // 节点样式
      defaultNode: {
        type: "flow-rect", // flow-rect我们自定义的样式名称，告诉画板要引用哪个模块
        style: {
          fill: "#0095FF", // 默认的模板填充色
        },
        // 默认的模板的文字的填充色
        labelCfg: {
          style: {
            fill: "#fff",
            fontSize: 20,
            fontWeight: 800,
          },
        },
      },
      // 线的样式
      defaultEdge: {
        type: "polyline",
        size: 3, // 粗细
        style: {
          stroke: "#CED4D9",
        },
      },
      // 布局
      layout: {
        type: "compactBox", // 布局类型
        direction: "LR", // 展开的方向
        // 与子节点的相差的高度
        getHeight: () => {
          return 150;
        },
        // 与子节点的相差的宽度
        getWidth: () => {
          return 200;
        },
      },
      maxZoom: 1, // 展开时的放缩比例
    };
    // 自定义节点和边
    const registerFn = () => {
      /**
       * 自定义节点
       */
      G6.registerNode(
        "flow-rect", // 自定义的节点名称，在上面进行引用
        {
          shapeType: "flow-rect",
          // 这里涉及到模板的生命周期函数，官网上面有详细的讲解
          draw(cfg, group) {
            const {
              colorIndex,
              organizationName,
              postName,
              peopleName,
              jiugongPosition,
              jiugongValue,
              successors,
              successorsValue,
              successionReadiness,
              successionReadinessValue,
            } = cfg;
            // 自定义模板
            const rectConfig = {
              width: 214,
              height: 147,
              fill: "#fff",
              shadowOffsetX: 0, // 模板阴影的X轴偏移量
              shadowOffsetY: 0, // 模板阴影的Y轴偏移量
              shadowColor: "#999",
              shadowBlur: 10,
            };
            // 规定边界，便于定位
            const nodeOrigin = {
              x: -rectConfig.width / 2,
              y: -rectConfig.height / 2,
            };
            // 规定文字位置，对齐方式
            const textConfig = {
              textAlign: "left",
              textBaseline: "bottom",
            };
            // 初始化模板
            const rect = group.addShape("rect", {
              attrs: {
                x: nodeOrigin.x,
                y: nodeOrigin.y,
                ...rectConfig,
              },
            });

            // 背景板
            group.addShape("rect", {
              attrs: {
                x: nodeOrigin.x, // x轴位置
                y: nodeOrigin.y, // y轴位置
                width: 214,
                height: 50,
                // radius: [0, 0, rectConfig.radius, rectConfig.radius],//锐角化
                fill: colors[colorIndex], // 填充色
              },
            });

            // 所属单位
            group.addShape("text", {
              attrs: {
                ...textConfig, // 继承文字的对齐方式
                x: 8 + nodeOrigin.x,
                y: 19 + nodeOrigin.y,
                width: 90,
                height: 10,
                fontSize: 10,
                opacity: 0.8,
                fill: "#7F7F7F",
                text: organizationName, // 文字内容区域
              },
            });

            // 岗位
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 8 + nodeOrigin.x,
                y: 45 + nodeOrigin.y,
                height: 16,
                text: postName,
                fontSize: 14,
                fill: "#555555",
                opacity: 1,
              },
            });

            // 人员名字
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 9 + nodeOrigin.x,
                y: 79 + nodeOrigin.y,
                text: peopleName,
                height: 18,
                fontSize: 16,
                fontWeight: 800,
                fill: "#333333",
                opacity: 1,
              },
            });

            // 九宫格位置
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 9 + nodeOrigin.x,
                y: 102 + nodeOrigin.y,
                text: jiugongPosition,
                height: 14,
                fontSize: 10,
                fill: "#7F7F7F",
                opacity: 0.5,
              },
            });
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 69 + nodeOrigin.x,
                y: 102 + nodeOrigin.y,
                text: jiugongValue,
                height: 14,
                fontSize: 10,
                fontWeight: 800,
                fill: "#333333",
                opacity: 1,
              },
            });

            // 继任者数
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 9 + nodeOrigin.x,
                y: -(nodeOrigin.y + 11),
                text: successors,
                fontSize: 10,
                fontWeight: 400,
                fill: "#555",
                opacity: 1,
              },
            });
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: 59 + nodeOrigin.x,
                y: -(nodeOrigin.y + 11),
                text: successorsValue,
                fontSize: 10,
                fontWeight: 800,
                fill: "#555",
                opacity: 1,
              },
            });

            // 间隔线
            group.addShape("rect", {
              attrs: {
                x: 4 + nodeOrigin.x,
                y: -(nodeOrigin.y + 30),
                width: 204,
                height: 1,
                fill: "#333",
                opacity: 0.35,
              },
            });

            // 继任准备度
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: -nodeOrigin.x - 95,
                y: 100 + nodeOrigin.y,
                height: 10,
                text: successionReadiness,
                fontSize: 10,
                fill: "#A30014",
              },
            });
            group.addShape("text", {
              attrs: {
                ...textConfig,
                x: -nodeOrigin.x - 37,
                y: 100 + nodeOrigin.y,
                height: 10,
                text:
                  successionReadinessValue.length !== 0
                    ? successionReadinessValue
                    : "—",
                fontSize: 10,
                fill: "#A30014",
              },
            });

            // 删除
            group.addShape("image", {
              attrs: {
                x: -nodeOrigin.x - 36,
                y: 12 + nodeOrigin.y,
                img: require("@/assets/logo.png"),
                width: 26,
                height: 26,
                cursor: "pointer",
              },
              name: "deleteItem",
            });
            // 继任度
            group.addShape("image", {
              attrs: {
                x: -nodeOrigin.x - 22,
                y: 88 + nodeOrigin.y,
                width: 12,
                height: 12,
                img: require("@/assets/logo.png"),
                cursor: "pointer",
              },
              name: "image-shape-state",
            });
            // 添加继任数
            group.addShape("image", {
              attrs: {
                x: -nodeOrigin.x - 38,
                y: -(nodeOrigin.y + 22),
                width: 12,
                height: 12,
                img: require("@/assets/logo.png"),
                cursor: "pointer",
              },
              name: "image-shape-add",
            });
            // 详情
            group.addShape("image", {
              attrs: {
                x: -nodeOrigin.x - 22,
                y: -(nodeOrigin.y + 22),
                width: 12,
                height: 12,
                img: require("@/assets/logo.png"),
                cursor: "pointer",
              },
              name: "image-shape-expand",
            });

            return rect;
          },
          // 定义锚点，G6会自动连接两个节点的最近的锚点
          getAnchorPoints() {
            return [
              // [0, 0.5], // 左侧中间
              // [1, 0.5], // 右侧中间
              [0.5, 0], // 上侧中间
              [0.5, 1], // 下侧中间
            ];
          },
        },
        "rect"
      );
    };
    registerFn();
    // 画布主体
    const treeGraph = new G6.TreeGraph({
      container: "mountNode", // 制定画布的容器
      ...defaultConfig,
    });

    // deleteItem: 对于需要单独操作的元素，请在定义数据的时候定义nama值，这样才可以定位到指定元素
    treeGraph.on("deleteItem:click", (ev) => {
      const shape = ev.target;
      const node = ev.item;
      console.log(shape);
      console.log(node);
    });
    treeGraph.data(data); // 加载数据
    treeGraph.render(); // 渲染
  },
};
</script>
</script>
<style scoped>
#mountNode {
  width: 1520px;
  height: 856px;
}
</style>
