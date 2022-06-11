import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { data as dataItem } from "../../data/data";
import { DragDropContextContainer, ListGrid } from "../../estilos";
import useDragVtow from "../../hooks/useDragVtwo";
import { Data } from "../../types";
import ListDragItem from "../ListDragItem";

const DragVTwo = () => {
  const { removeFromList, addToList } = useDragVtow();
  const [data, setdata] = useState(dataItem);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const {source, destination, draggableId} = result;

    // Item origin
    const groupOrigin = data.filter
      ((item: any) => item.name === source.droppableId)

    const groupIndexOrigin: number = data.findIndex
      ((item: any) => item.name === source.droppableId)

    const listCopy: any = [...groupOrigin];

    // Item destination
    const groupIndexDestination: number = data.findIndex
      ((item: any) => item.name === destination.droppableId);

    // Esamblado de arreglos
    const questionsOrigin = [...data[groupIndexOrigin].questions]
    const questionsDestination = [...data[groupIndexDestination].questions]

    const [removedElement, newSourceList] = removeFromList(
      // listCopy[0].questions,
      questionsOrigin,
      result.source.index
    );

    questionsDestination.splice(destination.index, 0, removedElement);
    //addToListV2(questionsDestination, destination.index, removedElement)

    const copyData = [...data];
    console.log(newSourceList)
    console.log(questionsDestination)

    copyData[groupIndexOrigin].questions = newSourceList;
    copyData[groupIndexDestination].questions = questionsDestination;

    setdata(copyData);
  };

  return (
    <DragDropContextContainer>
      <ListGrid>
        <DragDropContext onDragEnd={onDragEnd}>
          {data?.map((item: Data) => (
            <ListDragItem
              elements={item}
              key={item?.name}
              prefix={item?.name}
            />
          ))}
        </DragDropContext>
      </ListGrid>
    </DragDropContextContainer>
  );
};

export default DragVTwo;
