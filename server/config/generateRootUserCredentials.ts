import { getRootAccountIteratorValue, updateRootAccountIteratorValue } from "../cache";

export default () => {
  let val: number = getRootAccountIteratorValue() || 0;

  updateRootAccountIteratorValue(1);

  const username = process.env["INSTAGRAPI_REST_USERNAME"]?.split(" ")?.[val];
  const password = process.env["INSTAGRAPI_REST_PASSWORD"]?.split(" ")?.[val];

  return {
    username,
    password,
  };
};
