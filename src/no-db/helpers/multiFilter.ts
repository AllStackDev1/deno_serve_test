import { IFilters } from "./types.ts";

export default (arr: Array<any>, filters: IFilters) => {
  const filterKeys = Object.keys(filters);
  return arr.filter((eachObj) => {
    return filterKeys.every((eachKey) => {
      if (!filters[eachKey].length) {
        return true;
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
};
