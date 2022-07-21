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

  const getFindIndex = (name: string) => data.findIndex((item: any) => item.name === name);

  const getQuestions = (index: number) => [...data[index].questions];

  const removeFromListData = (list: any[], index: number) => {
    const removed = list.splice(index, 1)[0]

    return [removed, list]
  }

  const addToList2 = (list: any[], index: number, item: any) => list.splice(index, 0, item)

  const onDragEnd2 = (result: any) => {
    if (!result.destination) return
    const { source, destination } = result

    /**
     * get index groups
     */
    const groupIndexOrigin: number = getFindIndex(source.droppableId)
    const groupIndexDestination: number = getFindIndex(destination.droppableId)
    
     /**
      * Get questions to origin and destination
      */
    const questionsOrigin = getQuestions(groupIndexOrigin)
    const questionDestination = getQuestions(groupIndexDestination)

    const [ removed, newList ] = removeFromListData(questionsOrigin, result.source.index)
    questionDestination.splice(destination.index, 0, removed)
    //addToList2(questionsOrigin, destination.index, removed)

    const copyData = [...data]

    copyData[groupIndexOrigin].questions = newList
    copyData[groupIndexDestination].questions = questionDestination
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const {source, destination, draggableId} = result;

    // Item origin
    // const groupOrigin = data.filter
    //   ((item: any) => item.name === source.droppableId)

    const groupIndexOrigin: number = data.findIndex
      ((item: any) => item.name === source.droppableId)

    // const listCopy: any = [...groupOrigin];
    //==========================================================================================

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
        <DragDropContext onDragEnd={onDragEnd2}>
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
