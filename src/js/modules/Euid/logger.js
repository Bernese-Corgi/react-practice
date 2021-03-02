// ? 1 캡슐화(보호)
// (function logger(Euid) {
//   'use strict';

/* -------------------------------------------------------------------------- */
// 메시지 스타일

const MESSAGE_STYLES = {
  log: `
      color: #1c1c1d;
      font-weight: bold;
    `,
  success: `
      color: #00c712;
      font-weight: bold;
    `,
  info: `
      color: #006afc;
      font-weight: bold;
    `,
  warn: `
      color: #ff9500;
      font-weight: bold;
    `,
  error: `
      color: #ee3327;
      font-weight: bold;
    `,
};

/* -------------------------------------------------------------------------- */
// 메시지 유틸리티

export const log = (message, messageStyle = MESSAGE_STYLES.log) => {
  console.log(`%c${message}`, messageStyle);
};

export const info = (message) => log('🔵 ' + message, MESSAGE_STYLES.info);

export const success = (message) =>
  log('🟢 ' + message, MESSAGE_STYLES.success);

export const warn = (message) => log('🟠 ' + message, MESSAGE_STYLES.warn);

export const error = (message) => log('🔴 ' + message, MESSAGE_STYLES.error);

/* -------------------------------------------------------------------------- */
// 모듈 내보내기

// commonJS module export 방식
// module.exports = {}

// ES module
// Euid.logger = {
//   log,
//   warn,
//   error,
//   success,
// };

// })((window.Euid = window.Euid || {})); // ? 1 Euid 속성에 값이 있으면 window.Euid를 가져온다.
