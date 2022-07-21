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

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    if (result.type !== "COLUMN") return

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
    // const removed = questionsOrigin.splice(result.source.index, 1)[0];
    questionDestination.splice(destination.index, 0, removed)


     const copyData = [...data]
    // console.log(copyData[groupIndexOrigin].questions)

    // // copyData[groupIndexOrigin].questions = newList
     copyData[groupIndexOrigin].questions = questionsOrigin
     copyData[groupIndexDestination].questions = questionDestination
     setdata(copyData)
  }

  return (
    <DragDropContextContainer>
      <ListGrid>
        <DragDropContext onDragEnd={onDragEnd}>
          {data?.map((item: Data) => (
            <ListDragItem
              key={item?.name}
              elements={item}
              prefix={item?.name}
            />
          ))}
        </DragDropContext>
      </ListGrid>
    </DragDropContextContainer>
  );
};

export default DragVTwo;
