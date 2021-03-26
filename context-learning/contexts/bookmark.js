import React from 'react';
/* 초기 북마크 상태 ----------------------------------------------------------------- */

// initBookmark
const initialBookmark = [];

/* 북마크 리듀서 (순수) 함수 ---------------------------------------------------------- */

// bookmarkReducer
function bookmarkReducer(state, action) {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((bookmark) => {
        return bookmark.id === action.payload.id ? action.payload : bookmark;
      });
    case DELETE:
      return state.filter(({ id }) => id !== action.payload);
    // 읽기를 시도할 경우, 현재 상태를 반환하도록 설정합니다.
    // 읽기 id
    case READ:
    default:
      return state;
  }
}

/* 액션 상태 ----------------------------------------------------------------------- */

// CREATE / UPDATE / DELETE / READ
const CREATE = 'create';
const READ = 'read';
const UPDATE = 'update';
const DELETE = 'delete';
/* 액션 크리에이터 ------------------------------------------------------------------ */

// addBookmarkAction
export const addBookmarkAction = (bookmark) => ({
  type: CREATE,
  bookmark,
});
// readAllBookmarkAction
export const readBookmarkAction = (bookmark) => ({
  type: READ,
  bookmark,
});
// updateBookmarkAction
export const updateBookmarkAction = (bookmark) => ({
  type: UPDATE,
  bookmark,
});
// deleteBookmarkAction
export const deleteBookmarkAction = (bookmark) => ({
  type: DELETE,
  bookmark,
});

/* 북마크 컨텍스트 객체 생성 ----------------------------------------------------------- */

// BookmarkContext
const BookmarkContext = React.createContext();

// 북마크 컨텍스트 프로바이더 래퍼 컴포넌트 내보내기
// BookmarkProvider
export const BookmarkProvider = (props) => {
  const [state, dispatch] = React.useReducer(bookmarkReducer, initialBookmark);

  return (
    <BookmarkContext.Provider
      value={{
        state,
        dispatch,
      }}
      {...props}
    />
  );
};

/* 고차 컴포넌트(HOC): 컨텍스트 값을 context props로 전달 ---------------------------------- */
// export const withBookmark = (Comp) => {
//   class WithBook
// }
// withBookmark

/* 커스텀 훅: 컨텍스트 값을 반환 -------------------------------------------------------- */

// useBookmark
export const useBookmark = () => React.useContext(BookmarkContext);
