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
import { LoremIpsum } from "lorem-ipsum";

interface Props {
  item: Questions;
  index: number;
}

const lorem = new LoremIpsum();

const ItemDrag: React.FC<Props> = (props) => {
  const { item, index } = props;
  const randomHeader = React.useMemo(() => lorem.generateWords(5), []);
  // console.log(item)

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => (
        <DragItem
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader>Description: {randomHeader}</CardHeader>
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
