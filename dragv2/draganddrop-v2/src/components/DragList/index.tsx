import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import DraggableElement from "../DraggableElement";
import { DragDropContextContainer, ListGrid } from "./styled";

const DragList = () => {
  const {
    generateLists,
    removeFromList,
    addToList,
    groups,
    handleAddGroup,
    handleAddItem,
  } = useDragAndDrop();
  const [elements, setElements] = React.useState<any>(generateLists());

  React.useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleAddGroup}>Add Group</button>
        <button onClick={handleAddItem}>Add item</button>
        <hr />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {groups.map((listKey: any) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};

export default DragList;
