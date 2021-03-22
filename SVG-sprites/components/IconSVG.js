// ----------------------------------------------------
// 예시: https://bit.ly/3cohQb6
// ----------------------------------------------------

const prefix = 'icon'

const files = {
  byId: {
    'check-mark': {
      width: 13,
      height: 12,
      viewBox: [0, 0, 13, 12],
      data:
        '<path xmlns="http://www.w3.org/2000/svg" fill="#525577" fill-rule="evenodd" d="M12.3705 1.20251C12.7985 1.55161 12.8624 2.18154 12.5133 2.6095L5.17153 11.6095C4.98525 11.8378 4.70774 11.9724 4.41308 11.9773C4.11843 11.9821 3.83664 11.8567 3.64296 11.6346L0.984735 8.58624C0.621757 8.16999 0.664944 7.5383 1.0812 7.17532C1.49745 6.81234 2.12914 6.85553 2.49212 7.27178L4.37117 9.42662L10.9635 1.34528C11.3127 0.917324 11.9426 0.853403 12.3705 1.20251Z" clip-rule="evenodd"/>',
    },
    'cross': {
      width: 12,
      height: 12,
      viewBox: [0, 0, 12, 12],
      data:
        '<path xmlns="http://www.w3.org/2000/svg" fill="#525577" fill-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.40106 3.25359C3.79159 2.86306 4.42475 2.86306 4.81528 3.25359L6.01883 4.45714L7.22238 3.25359C7.61291 2.86306 8.24607 2.86306 8.6366 3.25359C9.02712 3.64411 9.02712 4.27728 8.6366 4.6678L7.43304 5.87135L8.6366 7.07491C9.02712 7.46543 9.02712 8.0986 8.6366 8.48912C8.24607 8.87964 7.61291 8.87964 7.22238 8.48912L6.01883 7.28557L4.81528 8.48912C4.42475 8.87964 3.79159 8.87964 3.40106 8.48912C3.01054 8.0986 3.01054 7.46543 3.40106 7.07491L4.60462 5.87135L3.40106 4.6678C3.01054 4.27728 3.01054 3.64411 3.40106 3.25359Z" clip-rule="evenodd"/>',
    },
    'not-allowed': {
      width: 12,
      height: 12,
      viewBox: [0, 0, 12, 12],
      data:
        '<path xmlns="http://www.w3.org/2000/svg" fill="#ADAEB6" fill-rule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM9.65221 6.00001C9.65221 8.01707 8.01707 9.65221 6.00001 9.65221C5.37082 9.65221 4.77878 9.4931 4.26195 9.21293L9.21292 4.26194C9.4931 4.77878 9.65221 5.37081 9.65221 6.00001ZM2.83053 7.81592L7.81591 2.83053C7.28103 2.52342 6.66103 2.34781 6.00001 2.34781C3.98296 2.34781 2.34781 3.98296 2.34781 6.00001C2.34781 6.66103 2.52342 7.28104 2.83053 7.81592Z" clip-rule="evenodd"/>',
    },
    'spinner': {
      width: 22,
      height: 22,
      viewBox: [0, 0, 50, 50],
      data:
        '<path xmlns="http://www.w3.org/2000/svg" fill="#525577" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate"/></path>',
    },
    'up-arrow': {
      width: 12,
      height: 12,
      viewBox: [0, 0, 12, 12],
      data:
        '<path xmlns="http://www.w3.org/2000/svg" fill="#525577" fill-rule="evenodd" d="M1.80202 3.65685L5.27085 0.292893C5.67355 -0.0976316 6.32645 -0.0976317 6.72915 0.292893L10.198 3.65685C10.6007 4.04738 10.6007 4.68054 10.198 5.07107C9.79528 5.46159 9.14238 5.46159 8.73968 5.07107L7.03117 3.41421L7.03117 11C7.03117 11.5523 6.5695 12 6 12C5.4305 12 4.96883 11.5523 4.96883 11L4.96883 3.41421L3.26032 5.07107C2.85762 5.46159 2.20472 5.46159 1.80202 5.07107C1.39933 4.68054 1.39933 4.04738 1.80202 3.65685Z" clip-rule="evenodd"/>',
    },
  },
  allIds: ['check-mark', 'cross', 'not-allowed', 'spinner', 'up-arrow'],
}

// SVG 아이콘 컴포넌트
function IconSVG(props) {
  if (props.isHidden) {
    return <svg display="none">{props.children}</svg>
  }

  let file = files.byId[props.id]

  if (!file) return null

  let width = props.width || file.width || null
  let height = props.height || file.height || null
  let viewBox = file.viewBox
    ? file.viewBox.join(' ')
    : '0 0 ' + props.width + ' ' + props.height

  return props.isHidden ? (
    <svg display="none">{props.children}</svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="xMinYMin"
      width={width}
      height={height}
      viewBox={viewBox}
    >
      <use xlinkHref={'#' + prefix + '-' + props.id} />
    </svg>
  )
}

// SVG 소스 컴포넌트
function SVGSource(props) {
  return (
    <IconSVG isHidden={true}>
      <defs>
        {files.allIds.reduce((defs, fileId, fileIndex) => {
          const file = files.byId[fileId]
          return defs.concat(
            <g
              key={fileIndex}
              id={prefix + '-' + fileId}
              // 참고: https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
              dangerouslySetInnerHTML={{ __html: file.data }}
            ></g>
          )
        }, [])}
      </defs>
    </IconSVG>
  )
}

export { IconSVG, SVGSource }
