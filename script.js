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

// 第三步：格式化完整报告
const gpaReport = (list) => {
  const valid = cleanCourses(list);
  if (valid.length === 0) {
    return '没有有效课程数据';
  }
  let totalCredit = 0;
  valid.forEach(c => { totalCredit += c.credit; });
  let detail = '';
  valid.forEach(c => {
    detail += `${c.name}（${c.credit}学分）：成绩${c.score}，绩点${toPoint(c.score)}
`;
  });
  return `===== 绩点计算报告 =====
有效课程${valid.length}门，总学分${totalCredit}
总绩点：${calcGpa(valid)}

各门课详情：
${detail}`;
};

try {
  console.log(gpaReport(courses));
} catch (err) {
  console.error('报告生成失败：', err.message);
}
