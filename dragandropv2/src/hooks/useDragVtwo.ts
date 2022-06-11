import { Data } from "../types";

const useDragVtow = () => {
  const removeFromList = (list: any, index: number) => {
    const [removed] = list.splice(index, 1);
    return [removed, list];
  };

  const addToList = (list: any, index: number, element: any) => {
    const response = list.splice(index, 0, element);
    return [];
  };

  const addToListV2 = (list: any, index: number, element: any) => {
    return list.splice(index, 0, element)
  }

  return {
    removeFromList,
    addToList,
    addToListV2
  };
};

export default useDragVtow;
