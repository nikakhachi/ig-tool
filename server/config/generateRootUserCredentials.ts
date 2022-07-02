import { getRootAccountIteratorValue } from "../cache";

export default () => {
  let val = getRootAccountIteratorValue(1);

  const username = process.env["INSTAGRAPI_REST_USERNAME"]?.split(" ")?.[val];
  const password = process.env["INSTAGRAPI_REST_PASSWORD"]?.split(" ")?.[val];

  return {
    username,
    password,
  };
};
