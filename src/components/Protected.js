import { useSelector } from "react-redux";
import Auth from "../pages/Auth";

export default function Protected(props) {
  const state = useSelector((state) => state);
  const isAuthenticated = state.token !== null && state.token !== undefined;
  return <>{isAuthenticated ? props.children : <Auth />}</>;
}
