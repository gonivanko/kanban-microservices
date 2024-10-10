import { Provider } from "react-redux";
import store from "../redux/store";

interface IReduxProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: IReduxProps) {
  return <Provider store={store}>{children}</Provider>;
}
