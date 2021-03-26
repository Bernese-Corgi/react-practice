# 상태 관리

1. 초기값을 설정한다.

```js
const initialAuth = null
```

2. 리듀서 함수 정의
   
```js
   const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        authUser: action.authUser,
      }
    case SIGN_OUT:
      return initialAuth
    default:
      throw new Error('요구되는 액션 타입이 존재하지 않습니다.')
  }
}
```

3. 액션 타입 상수로 선언

```js
const SIGN_IN = '로그인'
const SIGN_OUT = '로그아웃'
```

4. 액션 크리에이터

- 정보 객체를 생성한다.
- 액션을 리듀서에 전달하는 것은 dispatch!
- dispatch의 인수로 액션을 전달하고, 액션의 인수를 지정했다면 인수도 넣는다.

auth.js

```js
export const signInAction = () => ({ type: SIGN_IN, authUser })
export const signOutAction = () => ({ type: SIGN_OUT })
```

Navigation.js

```js
const signOut = () => dispatch(signOutAction())
```