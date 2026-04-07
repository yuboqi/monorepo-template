// 在 backend/src/index.ts 中添加这些代码来测试
console.log("hello");

// 这些应该会报错，因为没有 globals.node
console.log(process.env.NODE_ENV); // process 应该报错
console.log(__dirname); // __dirname 应该报错
console.log(__filename); // __filename 应该报错
