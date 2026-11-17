// Artifact build only: the automatic JSX runtime implemented on top of the React UMD global.
const React = window.React

export const Fragment = React.Fragment

export function jsx(type, props, key) {
  if (key === undefined) return React.createElement(type, props)
  return React.createElement(type, Object.assign({}, props, { key }))
}

export const jsxs = jsx

export function jsxDEV(type, props, key) {
  return jsx(type, props, key)
}
