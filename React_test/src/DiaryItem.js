import { useRef, useState } from "react";

const DiaryItem = ({
  onRemove,
  onEdit,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  //isEdit가 True로 바뀌면 수정하는 상태이다.
  const [isEdit, setIsEdit] = useState(false);
  //isEdit의 상태를 변화 시켜줄 toggleIsEdit 함수
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //수정 취소
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  //수정 완료
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      //App.js에서 만든 onEdit
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  //삭제하기
  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isEdit ? (
        //isEdit가 True면 수정 중인 상태
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        //isEdit가 False면 수정 전 상태
        <>
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
