import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnHeader, DroppableStyles } from "../../estilos";
import { Data, Questions } from "../../types";
import ItemDrag from "../ItemDrag";

interface Props {
  elements: Data;
  prefix: string;
}

const ListDragItem: React.FC<Props> = (props) => {
  const { prefix, elements } = props;

  return (
    <DroppableStyles>
      <ColumnHeader>{elements?.name}</ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: "90%" }}>
            {elements?.questions?.map((question: Questions, index: number) => (
              <ItemDrag item={question} key={index} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default ListDragItem;
