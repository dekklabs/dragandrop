import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnHeader, DroppableStyles } from "../../estilos";
import { Data, Questions } from "../../types";
import ItemDrag from "../ItemDrag";
import {Bloq} from "./styled";

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
          <Bloq {...provided.droppableProps} ref={provided.innerRef} >
            {elements?.questions?.map((question: Questions, index: number) => (
              <ItemDrag item={question} key={index} index={index} />
            ))}
          </Bloq>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default ListDragItem;
