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

// 第二步：绩点转换与计算

// 清洗：只保留0-100分的合法课程
const cleanCourses = (list) => list.filter(c => c.score >= 0 && c.score <= 100);

// 成绩转绩点
const toPoint = (score) => {
  if (score >= 90) return 4.0;
  if (score >= 85) return 3.7;
  if (score >= 82) return 3.3;
  if (score >= 78) return 3.0;
  if (score >= 75) return 2.7;
  if (score >= 72) return 2.3;
  if (score >= 68) return 2.0;
  if (score >= 64) return 1.5;
  if (score >= 60) return 1.0;
  return 0;
};

// 计算加权总绩点
const calcGpa = (list) => {
  if (list.length === 0) return 0;
  let totalCredit = 0;
  let totalPoint = 0;
  list.forEach(c => {
    totalCredit += c.credit;
    totalPoint += c.credit * toPoint(c.score);
  });
  return (totalPoint / totalCredit).toFixed(2);
};

// 打印中间结果
const valid = cleanCourses(courses);
console.log('清洗后课程数：', valid.length);
console.log('每门课绩点：');
valid.forEach(c => {
  console.log(`  ${c.name}：成绩${c.score}，绩点${toPoint(c.score)}`);
});
console.log('总绩点：', calcGpa(valid));
