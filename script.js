// 第一步：定义课程数据
const courses = [
  { name: '高等数学A', credit: 4, score: 92, type: '公共课' },
  { name: '大学英语一', credit: 3, score: 85, type: '公共课' },
  { name: '思想道德与政治', credit: 3, score: 88, type: '公共课' },
  { name: '体育一', credit: 1, score: 76, type: '公共课' },
  { name: '线性代数', credit: 3, score: 82, type: '公共课' },
  { name: '数据结构', credit: 4, score: 78, type: '专业课' },
  { name: '概率论A', credit: 3, score: 90, type: '专业课' },
  { name: '离散数学', credit: 3, score: 65, type: '专业课' },
  { name: '测试课', credit: 2, score: 105, type: '测试' }   // 故意混入非法成绩
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

// ===== 研究任务1：排序深入研究 =====
// sort比较函数规则：
// 返回负数 -> a排在b前面
// 返回正数 -> b排在a前面
// 返回0 -> 位置不变

// 按两个字段排序：先按类别（公共课在前），同类别再按成绩从高到低
const sortByTypeAndScore = (list) => {
  // 复制一份，不改动原数组
  const copy = [...list];
  copy.sort((a, b) => {
    // 先比较类别
    if (a.type !== b.type) {
      // 公共课排前面，专业课排后面
      if (a.type === '公共课') return -1;
      if (b.type === '公共课') return 1;
      return a.type.localeCompare(b.type);
    }
    // 类别相同，按成绩降序（高分在前）
    return b.score - a.score;
  });
  return copy;
};

console.log('===== 研究任务1：排序结果 =====');
const validCourses = cleanCourses(courses);
console.log('排序前：');
validCourses.forEach(c => console.log(`  ${c.type} - ${c.name} - ${c.score}分`));

const sorted = sortByTypeAndScore(validCourses);
console.log('排序后（先公共课，同类别成绩降序）：');
sorted.forEach(c => console.log(`  ${c.type} - ${c.name} - ${c.score}分`));

// ===== 研究任务2：正则表达式校验手机号 =====
// 正则：/^1[3-9]\d{9}$/
// 逐段解释：
// ^        表示字符串开头
// 1        手机号第一位必须是1
// [3-9]    第二位必须是3到9之间的数字
// \d{9}    \d表示数字，{9}表示正好9个数字
// $        表示字符串结尾
// 合起来：1开头，第二位3-9，后面再跟9位数字，总共11位

const phoneReg = /^1[3-9]\d{9}$/;

// 测试数据
const testPhones = [
  '13812345678',  // 合法
  '15987654321',  // 合法
  '12345678901',  // 非法：第二位是2
  '1381234567',   // 非法：只有10位
  '138123456789', // 非法：12位
  'abcdefghijk'   // 非法：不是数字
];

console.log('===== 研究任务2：手机号正则校验 =====');
testPhones.forEach(phone => {
  const result = phoneReg.test(phone);
  console.log(`  ${phone}：${result ? '合法' : '不合法'}`);
});

// ===== 研究任务3：性能对比实验（for循环 vs reduce） =====
// 构造10万条大样本课程数据以测量毫秒级耗时差异
const largeCourses = Array.from({ length: 100000 }, (_, i) => ({
  name: `课程${i + 1}`,
  credit: (i % 4) + 1,
  score: 60 + (i % 41),
  type: i % 2 === 0 ? '公共课' : '专业课'
}));

console.log('===== 研究任务3：性能对比实验（10万条数据） =====');

// 1. 传统for循环统计总分
console.time('for循环耗时');
let totalScoreFor = 0;
for (let i = 0; i < largeCourses.length; i++) {
  totalScoreFor += largeCourses[i].score;
}
const avgScoreFor = (totalScoreFor / largeCourses.length).toFixed(2);
console.timeEnd('for循环耗时');

// 2. reduce高阶函数统计总分
console.time('reduce耗时');
const totalScoreReduce = largeCourses.reduce((sum, c) => sum + c.score, 0);
const avgScoreReduce = (totalScoreReduce / largeCourses.length).toFixed(2);
console.timeEnd('reduce耗时');

console.log(`for循环计算：总分${totalScoreFor}，平均分${avgScoreFor}`);
console.log(`reduce计算：总分${totalScoreReduce}，平均分${avgScoreReduce}`);
