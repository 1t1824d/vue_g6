<template>
  <div class="HomePage">
    <!--       <component :is='"GSix1"'></component>
      <component :is='"GSix2"'></component> 
       <component :is='"GSix3"'></component>
      <component :is='"GSix4"'></component>
    <component :is="'GSix5'"></component>
     <component :is="'GSix6'"></component>-->
    <!-- <component :is="'GSix7'"></component> -->
    <component :is="'GSix8'"></component>
   <!--  <button @click="saveJSON(ListData, '树形数据.json')">下载数据</button> -->
  </div>
</template>

<script>
import GSix1 from "./demo/GSix1.vue";
import GSix2 from "./demo/GSix2.vue";
import GSix3 from "./demo/GSix3.vue";
import GSix4 from "./demo/GSix4.vue";
import GSix5 from "./demo/GSix5.vue";
import GSix6 from "./demo/GSix6.vue";
import GSix7 from "./demo/GSix7.vue";
import GSix8 from "./demo/GSix8.vue";
export default {
  name: "HomePage",
  components: {
    GSix1,
    GSix2,
    GSix3,
    GSix4,
    GSix5,
    GSix6,
    GSix7,
    GSix8
  },
  mounted() {
  // this.InitDataFun()
  },
  methods: {
    saveJSON(data, filename) {
      if (!data) {
        alert("保存的数据为空");
        return;
      }
      if (!filename) filename = "json.json";
      if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
      }
      var blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    /************************以下是生成数据方法***********************************/
    InitDataFun() {
      let ListData = [];
      let FirstContentData = [];
      let SecondContentData = [];
      let ThirdContentData = [];
      let FourContentData = [];
      for (var i = 0; i < 2; i++) {
          let ListDataSec = [];
          for (var Seci = 0; Seci < 6; Seci++) {
            let ListDatarsd = [];
            for (var Rsdi = 0; Rsdi < 5; Rsdi++) {
              let ListDataFour = [];
              for (var Fouri = 0; Fouri <9; Fouri++) {
                ListDataFour.push({
                  Name: "四级水厂" + (Fouri + 1),
                  Label: "四级水厂" + (Fouri + 1),
                  Status: 1,
                  Msg: [],
                  IsFather: false,
                  Depth: 4,
                  Time: "13:0" + Fouri,
                  id:  "Firstlid" + (i + 1)+"Secondlid" + (Seci + 1)+"Thirdlid" + (Rsdi + 1)+"Fourlid" + (Fouri + 1),
                  LID: "Fourlid" + (Fouri + 1),
                  ShowCode:
                    "一级---" +
                    (i + 1) +
                    "---二级---" +
                    (Seci + 1) +
                    "---三级---" +
                    (Rsdi + 1) +
                    "---四级---" +
                    (Fouri + 1),
                  children: [],
                  List: [
                    {
                      Title: "浊度",
                      Data: 0.23,
                    },
                    {
                      Title: "PH",
                      Data: 3,
                    },
                    {
                      Title: "湿度",
                      Data: 0.63,
                    },
                    {
                      Title: "COD",
                      Data: 0.23,
                    },
                  ],
                });
              }
              ListDatarsd.push({
                Name: "三级水厂" + (Rsdi + 1),
                Label: "三级水厂" + (Rsdi + 1),
                Status: 1,
                Msg: [],
                IsFather: true,
                Depth: 3,
                Time: "13:0" + Rsdi,
                id: "Firstlid" + (i + 1)+"Secondlid" + (Seci + 1)+"Thirdlid" + (Rsdi + 1),
                LID: "Thirdlid" + (Rsdi + 1),
                ShowCode:
                  "一级---" +
                  (i + 1) +
                  "---二级---" +
                  (Seci + 1) +
                  "---三级---" +
                  (Rsdi + 1),
                children: ListDataFour,
                List: [
                  {
                    Title: "浊度",
                    Data: 0.23,
                  },
                  {
                    Title: "PH",
                    Data: 3,
                  },
                  {
                    Title: "湿度",
                    Data: 0.63,
                  },
                  {
                    Title: "COD",
                    Data: 0.23,
                  },
                ],
              });
            }
            ListDataSec.push({
              Name: "二级水厂" + (Seci + 1),
              Label: "二级水厂" + (Seci + 1),
              Status: 0,
              Msg: [],
              IsFather: true,
              Depth: 2,
              Time: "13:0" + Seci,
              id:"Firstlid" + (i + 1)+"Secondlid" + (Seci + 1),
              LID: "Secondlid" + (Seci + 1),
              ShowCode: "一级---" + (i + 1) + "---二级---" + (Seci + 1),
              children: ListDatarsd,
              List: [
                {
                  Title: "浊度",
                  Data: 0.23,
                },
                {
                  Title: "PH",
                  Data: 3,
                },
                {
                  Title: "湿度",
                  Data: 0.63,
                },
                {
                  Title: "COD",
                  Data: 0.23,
                },
              ],
            });
          }

          ListData.push({
            Name: "一级水厂" + (i + 1),
            Label: "一级水厂" + (i + 1),
            Status: 0,
            Msg: [],
            IsFather: true,
            Depth: 1,
            Time: "13:0" + i,
            id:"Firstlid" + (i + 1),
            LID: "Firstlid" + (i + 1),
            ShowCode: "一级---" + (i + 1),
            List: [
              {
                Title: "浊度",
                Data: 0.23,
              },
              {
                Title: "PH",
                Data: 3,
              },
              {
                Title: "湿度",
                Data: 0.63,
              },
              {
                Title: "COD",
                Data: 0.23,
              },
            ],
            children: ListDataSec,
          });
           
        
   
      }

      this.ListData = ListData;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.HomePage {
  width: 100%;
  height: 100%;
}
</style>
