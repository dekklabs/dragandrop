interface DropSource {
  index: number;
  droppableId: number
}

const useGenerateFakeData = () => {
  const grid: number = 8;

  const getItems = (count: any, offset: number = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const move = (source: any[], destination: any, droppableSource: DropSource, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: {[droppableId: string]: any} = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log("work")

    return result;
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggles
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });

  return {
    getItems,
    reorder,
    grid,
    move,
    getItemStyle,
    getListStyle,
  }
}

export default useGenerateFakeData;
