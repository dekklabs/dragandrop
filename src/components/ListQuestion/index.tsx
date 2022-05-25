import { FC } from "react";
import ItemQuestion from "../ItemQuestion";
import { Props } from "./types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ListQuestion: FC<Props> = (props) => {
  const { onDragEnd, questions, getListStyle, getItemStyle } = props;

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {questions.map((question, index) => (
          <Droppable key={index} droppableId={`${index}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <p>Group {index + 1}</p>
                {question.map((item: any, index: number) => (
                  <ItemQuestion
                    question={item}
                    key={index}
                    index={index}
                    getItemStyle={getItemStyle}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ListQuestion;
