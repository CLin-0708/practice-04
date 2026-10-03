// 第一步：定义课程数据
const courses = [
  { name: '高等数学A', credit: 4, score: 92 },
  { name: '大学英语一', credit: 3, score: 85 },
  { name: '思想道德与政治', credit: 3, score: 88 },
  { name: '体育一', credit: 1, score: 76 },
  { name: '线性代数', credit: 3, score: 82 },
  { name: '数据结构', credit: 4, score: 78 },
  { name: '概率论A', credit: 3, score: 90 },
  { name: '离散数学', credit: 3, score: 65 },
  { name: '测试课', credit: 2, score: 105 }   // 故意混入非法成绩
];

console.table(courses);
