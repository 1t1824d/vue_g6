// 引入mockjs
const Mock = require("mockjs");

import GetPredictData from './data/GetPredictData.json'
import AlgorithmCategory from './data/algorithm-category.json'
import ListData from './data/ListData.json'



// Mock.mock( url, post/get , 返回的数据)；

Mock.mock("/api/GetPredictData", "post", GetPredictData);
Mock.mock("/api/algorithm-category", "post", AlgorithmCategory);
Mock.mock("/api/ListData", "post", ListData);