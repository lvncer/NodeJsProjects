const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring"); //☆追加

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

// ここまでメインプログラム==========

var data = { msg: "no message..." };

// createServerの処理
function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true); //☆trueに

  switch (url_parts.pathname) {
    case "/":
      response_index(request, response); //☆修正
      break;

    case "/other":
      response_other(request, response); //☆修正
      break;

    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page...");
      break;
  }
}

// ☆indexのアクセス処理
function response_index(request, response) {
  // POSTアクセス時の処理
  if (request.method == "POST") {
    var body = "";

    // データ受信のイベント処理
    request.on("data", (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on("end", () => {
      data = qs.parse(body); // ☆データのパース
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

// indexの表示の作成
function write_index(request, response) {
  var msg = "※伝言を表示します。";
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

// ☆otherのアクセス処理
function response_other(request, response) {
  var msg = "これはOtherページです。";
  var content = ejs.render(other_page, {
    title: "Other",
    content: msg,
    data: data2,
    filename: "data_item",
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
