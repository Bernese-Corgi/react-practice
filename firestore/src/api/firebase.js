// firebase/app 모듈 불러오기
import firebase from 'firebase/app'

// auth, firestore 모듈 불러오기
import 'firebase/auth'
import 'firebase/firestore'

/* configuration ------------------------------------------------------------ */

// Firebase 앱 구성 (객체)
const firebaseConfig = {
  apiKey: 'AIzaSyB57KOua-srNOtYl3P5xZHDCVZxaS3uM5s',
  authDomain: 'jy-movies.firebaseapp.com',
  projectId: 'jy-movies',
  storageBucket: 'jy-movies.appspot.com',
  messagingSenderId: '765167117344',
  appId: '1:765167117344:web:c8b083c032e65969968845',
  measurementId: 'G-DCNNXWF9KE',
}

/* initialization ----------------------------------------------------------- */

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig)

/* export modules ----------------------------------------------------------- */

// 인증 객체
export const auth = firebase.auth()

// 언어 현지화 (명시적 설정)
auth.languageCode = 'ko'
// 기기의 현재 사용 중인 언어로 설정 (기기 설정에 따름)
// auth.useDeviceLanguage()

// 데이터베이스 객체
export const firestore = firebase.firestore()

// firebase app 기본 내보내기
export default firebase

/* Google Authentication Provider ------------------------------------------- */

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
googleAuthProvider.setCustomParameters({ prompt: 'select_account' })

// Google 인증 공급자 로그인(회원가입) 유틸리티
export const signInGoogle = () => auth.signInWithPopup(googleAuthProvider)

// 로그아웃 유틸리티
export const signOut = () => auth.signOut()

// firebase에서 인증 사용자를 생성하거나 가져오는 유틸리티 함수
// firebase에서 가져오므로 비동기 -> async, await
export const createOrGetAuthUser = async (user, additionalData = {}) => {
  // 유효성 검사
  // user 값이 전달되지 않았다면 오류를 출력
  if (!user) {
    throw new Error(
      'createOrGetAuthUser 함수는 user 인자를 필수로 전달받아야 합니다.'
    )
  }

  // Users 컬렉션 내부의 새로운 Document 참조 객체 생성
  const userDocRef = firestore.doc(`users/${user.uid}`)

  // 문서 참조 객체의 get 메서드를 사용해서 스냅샷 가져오기
  // snapshot 가져오기 : 비동기 방식이므로 async 사용하자
  const snapshot = await userDocRef.get()

  // 1 만약 snapshot.exits 속성 값이 false이면 신규 사용자 등록
  if (!snapshot.exists) {
    // 전달받은 user에서 데이터베이스에 저장할 속성을 추출
    // displayName, photoURL, email, uid, createAt
    const { displayName, photoURL, email, uid } = user
    const createAt = new Date()

    await userDocRef.set({
      displayName,
      photoURL,
      email,
      uid,
      createAt,
      ...additionalData,
    })
  }

  // 2. 이미 존재하는 사용자인 경우 userDocRef를 반환 (인증 사용자 참조를 반환)
  // 왜? onSnapShot 이벤트 처리를 위해서
  // 비동기 아닌 방식일떄?!?!?!?
  return userDocRef
}

// 회원가입시에 사용될 유틸리티 함수
// 이메일, 패스워드를 회원가입 폼에서부터 전달받아요
export const signUpWithEmailAndPassword = async (
  email,
  password,
  additionalData = {}
) => {
  try {
    // firebase Auth 서비스의 메서드를 사용해서 사용자 생성 (비동기 함수)
    const { user } = await auth.createUserWithEmailAndPassword(email, password)

    // 유틸리티 createOrGetAuthUser함수를 사용해
    // Firebase Users를 통해
    await createOrGetAuthUser(user, additionalData)
  } catch (error) {
    console.error(error.message)
  }
}
