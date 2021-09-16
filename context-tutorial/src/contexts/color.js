import { createContext, useState } from 'react';

const ColorContext = createContext({
  // 기본값은 실제 Provider의 value에 넣는 객체와 형태를 일치시켜주는 것이 좋다.
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  // state와 actions 객체를 따로 분리하면 나중에 다른 컴포넌트에서 Context 값을 사용하기 편리해진다.
  const value = {
    // state로 상태 전달
    state: { color, subcolor },
    // actions로 업데이트 함수 전달
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

// cosnt ColorConsumer = ColorContext.Consumer와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
