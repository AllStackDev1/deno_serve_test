export default (search: string) => {
  if (!search) return {};
  return JSON.parse(
    '{"' + search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    },
  );
};
