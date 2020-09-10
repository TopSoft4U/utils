import queryString from "query-string";
import {useLocation} from "react-router-dom";

export const useQueryString = () => {
  const {search} = useLocation();
  if (!search)
    return undefined;

  return queryString.parse(search);
};
