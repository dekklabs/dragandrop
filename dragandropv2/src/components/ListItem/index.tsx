import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { LoremIpsum } from "lorem-ipsum";
import { generateFromString } from "generate-avatar";
import React from "react";

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const lorem = new LoremIpsum();

interface Props {
  item: any;
  index: any;
}

const ListItem: React.FC<Props> = (props) => {
  const { item, index } = props;
  const randomHeader = React.useMemo(() => lorem.generateWords(5), []);

  return (
    <Draggable draggableId={item?.id} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>{randomHeader}</CardHeader>
            <span>Content</span>
            <CardFooter>
              <span>{item?.content}</span>
              <Author>
                {item?.id}
                <Avatar
                  src={`data:image/svg+xml;utf8,${generateFromString(item?.id)}`}
                />
              </Author>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
