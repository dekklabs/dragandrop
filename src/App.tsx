import "./App.css";
import ListQuestion from "./components/ListQuestion";
import { useState } from "react";
import useGenerateFakeData from "./hooks/useGenerateFakeData";

function App() {
  const {
    getItems,
    reorder,
    move,
    getListStyle,
    getItemStyle,
    selectedPositionToArrayState,
  } = useGenerateFakeData();
  const [state, setState] = useState<any[]>([
    getItems(0),
    getItems(8),
    getItems(5, 8),
  ]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped ouytside the list
    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  };

  const handleAddGroup = () => {
    setState([...state, []]);
  };

  const handleAddItem = () => {
    const response: any[][] = selectedPositionToArrayState(0, state);
    setState(response);
  };

  return (
    <>
      <div style={{ marginBottom: 20, paddingTop: 20, marginLeft: 10 }}>
        <button
          type="button"
          onClick={handleAddGroup}
          style={{ marginRight: 20 }}
        >
          Add new group
        </button>
        <button type="button" onClick={handleAddItem}>
          Add new item
        </button>
      </div>
      <ListQuestion
        questions={state}
        onDragEnd={onDragEnd}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
      />
    </>
  );
}

export default App;
