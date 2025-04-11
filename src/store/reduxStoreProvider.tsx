"use client";
import { Provider } from "react-redux";
import { store } from ".";
const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
