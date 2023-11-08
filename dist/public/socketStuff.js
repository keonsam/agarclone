const io = io.connect("http://localhost:9000");

io.on("init", (initData) => {
  console.log(initData);
});
