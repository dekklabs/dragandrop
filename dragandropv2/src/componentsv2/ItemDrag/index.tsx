import { generateFromString } from "generate-avatar";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Author,
  Avatar,
  CardFooter,
  CardHeader,
  DragItem,
} from "../../estilos";
import { Questions } from "../../types";

interface Props {
  item: Questions;
  index: number;
  id: string;
}

const ItemDrag: React.FC<Props> = (props) => {
  const { item, index, id } = props;

  return (
    <Draggable draggableId={id} index={index} key={id} >
      {(provided: any, snapshot: any) => (
        <DragItem
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader>Description: Quisque velit nisi, pretium ut lacinia in, elementum id enim.</CardHeader>
          <CardFooter>
            <span>Item: {item?.content}</span>
            <Author>
              <Avatar
                src={`data:image/svg+xml;utf8,${generateFromString(item?.id)}`}
                alt={item.content}
              />
            </Author>
          </CardFooter>
        </DragItem>
      )}
    </Draggable>
  );
};

export default ItemDrag;
