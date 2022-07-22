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

    if (source.droppableId === destination.droppableId) {
      const element: any = questionsOrigin.splice(result.source.index, 1)[0]
      questionsOrigin.splice(destination.index, 0, element)

      const copyData = [...data]
      copyData[groupIndexOrigin].questions = questionsOrigin
      setdata(copyData)
      return
    }

    const [ removed, newList ] = removeFromListData(questionsOrigin, result.source.index)
    const newRemoved = {...removed}
    questionDestination.splice(destination.index, 0, newRemoved)

    const copyData = [...data]

    copyData[groupIndexOrigin].questions = newList
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
