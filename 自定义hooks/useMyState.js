const forceRefresh = () => {
  console.log("Force fresh <App />");
  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
};


let saveState = null;

export function useMyState(state) {
  saveState = saveState || state;
  const rtnState = saveState;
  const setState = (newState) => {
    saveState = newState;
    forceRefresh();
  };
  return [rtnState, setState];
}

// 参考链接：https://www.cnblogs.com/WindrunnerMax/p/16211267.html
