# News Viewer

리액트로 비동기 작업을 수행하기 위한 프로젝트입니다.

## 비동기 작업

### 비동기 작업이 필요한 경우 - 1 서버와의 데이터 송수신

웹 애플리케이션에서 서버 쪽의 데이터가 필요할 때는 Ajax 기법을 사용해 서버의 API를 호출함으로써 데이터를 수신한다.

이렇게 서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되는 것이 아니라, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리한다.

만약 작업을 동기적으로 처리한다면 요청이 끝날 때까지 기다리는 동안 중지 상태가 되기 때문에 다른 작업을 할 수 없다.

요청이 끝나야 비로소 그 다음 예정된 작업을 할 수 있다.

하지만 이를 비동기적으로 처리한다면 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수도 있고, 기다리는 과정에서 다른 함수도 호출할 수 있다.

### 비동기 작업이 필요한 경우 - 2. setTimeout 함수를 사용해 특정 작업을 예약

setTiemout 함수를 사용하여 특정 작업을 예약하고 실행할 때는 비동기적으로 수행한다.

## News API를 이용해 기사 렌더링하기

### News API 데이터 불러오는 방법

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&category=science&apiKey=656e5f6ee4c24324a79ec250c2aec539',
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>불러오기</button>
      {data && (
        <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />
      )}
    </>
  );
}

export default App;
```

### News Item 컴포넌트 : 뉴스 기사 하나를 표시하는 컴포넌트

<span style="color: #a3a8a5">▾ src/components/NewsItem.js</span>

```jsx
import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  /* ... */
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {/* 썸네일 */}
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        {/* 기사 제목 */}
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        {/* 기사 내용 미리보기 */}
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
```

### News List 컴포넌트 : 기사 리스트를 렌더링하는 컴포넌트

useEffect의 콜백 `함수 내부에서 데이터를 받아오는 비동기 함수를 작성한다.

useEffect에 등록하는 함수에는 async를 사용할 수 없다. useEffect에서 반환해야 하는 값은 cleanup 함수이기 때문!

useEffect 내부에서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어 사용해야 한다.

<span style="color: #a3a8a5">▾ src/components/NewsList.js</span>

```jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  /* ... */
`;

const NewsList = () => {
  // articles 상태
  const [articles, setArticles] = useState(null);

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // article 불러오기
  useEffect(() => {
    // 데이터 가져오기 함수, async를 사용하는 함수는 따로 선언해야 한다.
    const fetchData = async () => {
      // 로딩 중이므로 loading
      setLoading(true);

      try {
        // news API에 get 요청
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&category=science&apiKey=656e5f6ee4c24324a79ec250c2aec539',
        );
        // get 요청의 응답 결과 값 객체 중 articles를 상태값에 설정
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }

      // 로딩 상태 false
      setLoading(false);
    };
    // fetchData 함수 호출
    fetchData();
  }, []);

  // 로딩 중일때 렌더링할 컴포넌트
  if (loading) {
    return <NewsListBlock>불러오는 중...</NewsListBlock>;
  }

  // !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다.
  if (!articles) {
    return null;
  }

  // ↓ articles이 null이면 컴포넌트를 렌더링 하지 않고, null을 반환하다가 articles 값이 유효한 순간에 컴포넌트를 렌더링한다.

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

아직 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생한다.

![image](https://user-images.githubusercontent.com/72931773/133435265-23952793-156a-4d32-99d9-76c0a288903a.png)

그러므로 아래 코드를 추가해서 오류 발생을 방지해야 한다.

```jsx
// !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다.
if (!articles) {
  return null;
}
```

### App에서 렌더링하기

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { NewsList } from './components';

function App() {
  return <NewsList />;
}

export default App;
```

## 카테고리 기능 구현하기

### 카테고리 분류 배열 만들기

<span style="color: #a3a8a5">▾ src/components/Categories.js</span>

```jsx
const categories = [
  { name: 'all', text: '전체보기' },
  { name: 'business', text: '비즈니스' },
  { name: 'entertainment', text: '엔터테인먼트' },
  { name: 'health', text: '건강' },
  { name: 'science', text: '과학' },
  { name: 'sports', text: '스포츠' },
  { name: 'technology', text: '기술' },
];
```

### App에서 카테고리 상태 관리하기

onSelect 함수에는 `category` 상태를 설정하는 코드를 작성하고, Categories 컴포넌트에 이 함수를 전달한다.

`category` 상태 값을 하위 컴포넌트에 전달한다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { useCallback, useState } from 'react';
import { Categories, NewsList } from './components';

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </div>
  );
}
```

### 카테고리 UI 구현

<span style="color: #a3a8a5">▾ src/components/Categories.js</span>

```jsx
import React from 'react';
import styled from 'styled-components';

const categories = [
  /* ... */
];

const CategoriesBlock = styled.div`
  /* ... */
`;

const Category = styled.div`
  /* ... */

  ${(props) =>
    props.active &&
    css`
      /* ... */
    `}
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {/* categories 배열을 순회 */}
      {categories.map((c) => (
        <Category
          // key에 카테고리 이름을 넣는다.
          key={c.name}
          // 상위 컴포넌트에서 받은 카테고리와 이름이 일치하는 배열의 요소이면 active를 true로 설정한다.
          active={category === c.name}
          // onClick 함수에 onSelect 함수를 바인딩한다.
          onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
```

### 카테고리에 따라 URL 파라미터 다르게 설정하기

category 값이 all이면 query 값을 공백으로 설정하고, all이 아니면 `&category=${category}` 형태의 문자열로 설정한다.

category 값이 바뀔때마다 뉴스를 새로 불러와야 하므로 useEffect의 의존성 배열에 넣는다

<span style="color: #a3a8a5">▾ src/components/NewsList.js</span>

```jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

// ...

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // category 값이 all이면 query 값을 공백으로 설정하고, all이 아니면 `&category=${category}` 형태의 문자열로 설정한다.
        const query = category === 'all' ? '' : `&category=${category}`;

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=656e5f6ee4c24324a79ec250c2aec539`,
        );

        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
    // category 값이 바뀔때마다 뉴스를 새로 불러와야 하므로 의존성 배열에 넣는다
  }, [category]);

  // ...

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

## 라우터 설정하기

### News 페이지 컴포넌트 생성

상위 컴포넌트에서 받아오는 match 객체의 params의 category를 category 변수에 담는다.

<span style="color: #a3a8a5">▾ src/page/News.js</span>

```jsx
import React from 'react';
import { Categories, NewsList } from '../components';

const News = ({ match }) => {
  const category = match.params.category || 'all';

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default News;
```

### App에서 Categories 컴포넌트 라우팅하기

`"/:category?"` 의 `?`는 category 값이 선택적이라는 의미이다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { Route } from 'react-router';
import { NewsPage } from './page';

function App() {
  return (
    <div>
      {/* "/:category?" 의 '?'는 category 값이 선택적이라는 의미 */}
      {/* category URL */}
      <Route path="/:category?" component={NewsPage} />
    </div>
  );
}

export default App;
```

### 카테고리 목록을 NavLink로 감싸기

<span style="color: #a3a8a5">▾ src/components/Categories.js</span>

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const categories = [
  /* ... */
];

const CategoriesBlock = styled.div`
  /* ... */
`;

const Category = styled(NavLink)`
  /* ... */

  &.active {
    /* ... */
  }
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category // NavLink로 만들어진 컴포넌트
          key={c.name}
          activeClassName="active"
          // to값이 '/'이면 exact 값이 true여야 한다.
          // 이 값을 설정하지 않으면 다른 카테고리가 선택되었을 때도 전체보기 링크에 active 스타일이 적용되는 오류가 발생한다.
          exact={c.name === 'all'}
          // to값 : 전체보기(all)이면 '/', 그 외의 세부 카테고리는 '/카테고리 이름'
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
```

## usePromsie 커스텀 훅

컴포넌트에서 API를 호출할 때처럼 Promise를 사용해야 하는 경우 사용할 커스텀 훅을 작성

### usePromsie

promise 객체를 생성하는 콜백 함수를 받아 대기, 완료, 실패 상태를 설정한 후 상태값을 배열로 반환한다.

<span style="color: #a3a8a5">▾ src/lib/usePromise.js</span>

```jsx
import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 / 완료 / 실패 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 어떠한 promise 작업을 수행하는 async 함수
    const process = async () => {
      // 로딩 상태 true로 설정하면서 시작
      setLoading(true);

      try {
        // usePromise 훅의 인수로 promise를 생성하는 콜백함수를 받아온다.
        // 프로미스 객체를 비동기로 받아오고, 그 결과값을 resolved 변수에 담는다.
        const resolved = await promiseCreator();

        // 서버와 통신한 데이터의 결과가 담긴 resovled 변수를 완료 상태값에 설정한다.
        setResolved(resolved);
      } catch (error) {
        // 에러 상태에 에러 객체를 전달한다.
        setError(error);
      }

      // 로딩 상태를 false로 설정하며 process 함수를 마친다.
      setLoading(false);
    };

    // promise 작업을 수행하는 process 함수를 호출한다.
    process();

    // 의존성 배열을 매개변수로 받아와서 설정한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // 대기, 완료, 실패 상태를 배열에 담아 반환한다.
  return [loading, resolved, error];
}
```

### 커스텀 훅 적용

<span style="color: #a3a8a5">▾ src/components/NewsList.js</span>

```jsx
// ...

const NewsList = ({ category }) => {
  // usePromise 훅 호출하고, 결과값을 배열 디스트럭칭 할당
  const [loading, response, error] = usePromise(
    // usePromise 훅의 첫번째 인수에는 promise를 생성하는 콜백 함수를 전달
    () => {
      // 쿼리 값에 카테고리 이름대로 설정
      const query = category === 'all' ? '' : `&category=${category}`;

      // 내부 콜백함수의 반환값으로 axios.get 요청을 작성
      return axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=656e5f6ee4c24324a79ec250c2aec539`,
      );
    },
    // category 값이 바뀔때마다 기사를 새로 불러와야 하므로 의존성 배열에 category를 넣어서 전달
    [category],
  );

  // 로딩 중일때 렌더링할 컴포넌트
  if (loading) {
    return <NewsListBlock>불러오는 중...</NewsListBlock>;
  }

  // response 값이 아직 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    console.log(error);
    return <NewsListBlock>에러 발생</NewsListBlock>;
  }

  // ↓ response가 null이면 컴포넌트를 렌더링 하지 않고, null을 반환하다가 response 값이 유효한 순간에 컴포넌트를 렌더링한다.

  // response 값이 유효할 때
  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx

```

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx

```
