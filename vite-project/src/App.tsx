import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mkdata, setMkdata] = useState([]);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState("新規作成");
  const [editId, setEditId] = useState(0);
  const [accountId, setAccountId] = useState("");

  // アカウントのチェック
  const getAccount = () => {
    fetch("/api/check")
      .then((resp) => resp.json())
      .then((res) => {
        if (res.result != false) {
          setAccountId(res.result);
        } else {
          window.location.href = "/login.html"; //☆
        }
      });
  };
  // 全データを取得
  const getAllData = () => {
    fetch("/api/all")
      .then((resp) => resp.json())
      .then((res) => {
        setMkdata(res);
      });
  };
  // 指定IDのデータを取得
  const getById = (e) => {
    fetch("/api/mark/" + e.target.name)
      .then((resp) => resp.json())
      .then((res) => {
        setTitle(res.title);
        setSource(res.content);
        setEditId(res.id);
        getRender(res.content);
        setMode("更新");
      });
  };
  // Markdownにレンダリングする
  const getRender = (src) => {
    const source = { source: src };
    fetch("/api/mark/render", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(source),
    })
      .then((data) => data.json())
      .then((res) => {
        setContent(res.render);
      });
  };
  // データを送信する
  const sendData = () => {
    if (mode == "新規作成") {
      create();
    } else {
      update();
    }
  };
  // レコードを新規作成する
  const create = () => {
    const data = {
      title: title,
      content: source,
      accountId: accountId,
    };
    fetch("/api/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      getAllData();
    });
  };
  /// レコードを更新する
  const update = () => {
    const data = {
      title: title,
      content: source,
      id: editId,
    };
    fetch("/api/mark/edit", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      console.log(data);
    });
  };
  // タイトルの更新
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  // ソースの更新
  const changeSource = (e) => {
    setSource(e.target.value);
  };
  // 副作用エフェクト
  useEffect(() => {
    getAccount();
    getAllData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="display-4 text-primary">Markdown data</h1>
      </header>
      <div role="main">
        <p className="h5 my-4">
          Hi,
          <span>{accountId}</span>!
        </p>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {mkdata.map((ob) => (
                <tr>
                  <td>
                    <a
                      className="text-dark"
                      href="#"
                      onClick={getById}
                      name={ob.id}
                    >
                      {ob.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr />

        <div>
          <div class="form-group">
            <label>TITLE</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={changeTitle}
              class="form-control"
              value={title}
            />
          </div>
          <div class="form-group">
            <label>SOURCE</label>
            <textarea
              name="source"
              id="source"
              rows="8"
              onChange={changeSource}
              class="form-control"
              value={source}
            ></textarea>
          </div>

          <center>
            <input
              type="button"
              value={mode}
              onClick={sendData}
              class="btn btn-primary m-2"
            />
          </center>
        </div>

        <div class="card mt-4">
          <div class="card-header text-center h5">Preview</div>
          <div class="card-body">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
