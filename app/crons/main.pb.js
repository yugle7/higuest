// 0 3 * * *

cronAdd("hello", "*/1 * * * *", () => {
  console.log("Hello!")
})