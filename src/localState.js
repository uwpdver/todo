export const loadState = () => {
  const state = localStorage.getItem("state");
  try {
    return JSON.parse(state);
  } catch (error) {
    // ignore error hanlde
    console.log(error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    // ignore error hanlde
  }
};
