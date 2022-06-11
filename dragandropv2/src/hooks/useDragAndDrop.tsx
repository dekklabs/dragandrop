import React from "react";

const useDragAndDrop = () => {
  const [groups, setGroups] = React.useState<string[]>([
    "Group1",
    "Group2",
    "Group3",
  ]);
  const getItems = (count: number, prefix: any = 0) =>
    Array.from({ length: count }, (_v, k) => k).map((_k: any) => {
      const randomId = Math.floor(Math.random() * 1000);

      return {
        id: `item-${randomId}`,
        prefix,
        content: `item ${randomId}`,
      };
    });

  const getItems2 = (count: any, offset: number = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`,
    }));

  const removeFromList = (list: any[], index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any[], index: number, element: any) => {
    console.log(list)
    console.log(index)
    console.log(element)
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  //const lists: string[] = ["Group 1", "Group 2", "Group 3"];

  const generateLists = () =>
    groups.reduce(
      (acc, listKey) => ({ ...acc, [listKey]: getItems(2, listKey) }),
      {}
    );

  const selectedPositionToArrayState = (position: number, items: any) => {
    console.log(items);
    //return items.map((item: any, index: number) => {
    ////if (index === position) return [...item, ...getItems(1, 0)];
    ////console.log(item);
    ////return item;
    //});
  };

  const handleAddGroup = () => {
    setGroups([...groups, "group 4"]);
  };

  //console.log(lists)

  const handleAddItem = () => {
    const response = selectedPositionToArrayState(0, getItems2(0));
    //setLists(response);
  };

  return {
    getItems,
    removeFromList,
    addToList,
    groups,
    generateLists,
    handleAddGroup,
    handleAddItem,
  };
};

export default useDragAndDrop;
