import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnHeader, DroppableStyles } from "../../estilos";
import { Data, Questions } from "../../types";
import ItemDrag from "../ItemDrag";
import { Bloq } from "./styled";

interface Props {
  elements: Data;
  prefix: string;
}

const ListDragItem: React.FC<Props> = (props) => {
  const { prefix, elements } = props;

  return (
    <DroppableStyles>
      <ColumnHeader>{elements?.name}</ColumnHeader>
      <Droppable
        droppableId={prefix}
        type="COLUMN"
        direction="vertical"
        ignoreContainerClipping={false}
        isCombineEnabled={false}
      >
        {(provided: any) => (
          <Bloq {...provided.droppableProps} ref={provided.innerRef}>
            {elements?.questions?.map((question: Questions, index: number) => (
              <ItemDrag id={question.id} item={question} key={index} index={index} />
            ))}
            {provided.placeholder}
          </Bloq>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default ListDragItem;
