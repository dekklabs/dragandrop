import {FC} from "react";
import {Props} from "./types";
import { Draggable } from "react-beautiful-dnd";

const ItemQuestion: FC<Props> = (props) => {
  const {question, index, getItemStyle} = props;

  return (
    <Draggable 
      key={question.id}
      draggableId={`${question.id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-around"
            }}>
            item {index}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default ItemQuestion;
