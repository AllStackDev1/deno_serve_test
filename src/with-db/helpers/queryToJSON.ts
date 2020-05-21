export default (search: string) => {
  if (!search) return {};
  return JSON.parse(
    '{"' + search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      if (!isNaN(value)) {
        return key === ""
          ? parseInt(value)
          : parseInt(decodeURIComponent(value));
      }
      if (key === "_id") return { "$oid": decodeURIComponent(value) };
      return key === "" ? value : decodeURIComponent(value);
    },
  );
};
