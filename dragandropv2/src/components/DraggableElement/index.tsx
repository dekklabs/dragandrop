import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListItem from "../ListItem";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
  margin-bottom: 20px;
`;

interface Props {
  prefix: any;
  elements: any;
}

const DraggableElement: React.FC<Props> = (props) => {
  const { prefix, elements } = props;
  //console.log(prefix)

  return (
    <DroppableStyles>
      <ColumnHeader>{prefix}</ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item: any, index: any) => (
              <ListItem key={item?.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default DraggableElement;
