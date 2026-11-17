// Artifact build only: `react-dom/client` from the ReactDOM UMD global.
const ReactDOM = window.ReactDOM

export const createRoot = ReactDOM.createRoot
export const hydrateRoot = ReactDOM.hydrateRoot
export default { createRoot, hydrateRoot }
