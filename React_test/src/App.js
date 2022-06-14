import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]); //글을 저장한다.
  const dataId = useRef(0); //각 일기에 아이디를 주기 위한 변수

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
      <DiaryEditor oncreate={onCreate} />
      <DiaryList onEidt={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
