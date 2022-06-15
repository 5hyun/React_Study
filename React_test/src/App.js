import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]); //글을 저장한다.
  const dataId = useRef(0); //각 일기에 아이디를 주기 위한 변수

  //async는 항상 Promise만 반환한다.
  const getData = async () => {
    //await은 async 안에서만 사용 가능하고 이 코드가 완료될 때 까지 기다린다.
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
      //밑에 then은 성공적 처리만 한다.
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; //글이 하나 만들어졌으니까 다음 글을 위해 1을 높인다.
    setData([newItem, ...data]); //추가 하는거라 새로운 글 추가하고 그 전에 있던거 불러온다
  };

  const onRemove = (targetId) => {
    //filter는 조건에 맞는 요소를 모아서 새로운 집합을 만들어 준다
    //따라서 filter를 아래 코드처럼 사용하면 삭제하려는 글 제외하고 새로운 배열로 만들어 준다.
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      //map 함수를 사용하면 배열을 순회하면서 그 반환값으로 새로운 배열을 만들 수 있다.
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
