// Artifact build only: re-export the ReactDOM UMD global loaded from cdnjs.
const ReactDOM = window.ReactDOM

export default ReactDOM
export const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createPortal,
  createRoot,
  findDOMNode,
  flushSync,
  hydrate,
  hydrateRoot,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
  version,
} = ReactDOM
