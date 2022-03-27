import { Fragment, useState, lazy } from "react";
import dataConstants, { statusArray } from "./constants/dataConstants";
import { flattenDataObject, getAllTaskQueues } from "./utils/globalUtils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { get, cloneDeep, isEmpty } from "lodash";
import "./styles/App.scss";
import Button from "./components/Button";
import Overlay from "./components/Overlay";
import Popup from "./components/Popup";
import Input from "./components/Input";
import { v4 as uuid } from "uuid";

function App() {
  const [fragmentedData, setFragmentedData] = useState(
    getAllTaskQueues(dataConstants) || {}
  );
  const [createNewItemPopup, setCreateNewItemPopup] = useState(false);
  const [createNewItemStatus, setCreateNewItemStatus] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnDragEnd = ({ source, destination }) => {
    if (typeof destination == "object" && !isEmpty(destination)) {
      let fragmentedDataCopy = cloneDeep(fragmentedData);
      const { index: sourceIdx, droppableId: sourceId } = source;
      const { index: targetIdx, droppableId: targetId } = destination;
      const [reorderedItem] = fragmentedDataCopy[sourceId].splice(sourceIdx, 1);
      fragmentedDataCopy[targetId].splice(targetIdx, 0, {
        ...reorderedItem,
        status: targetId,
      });
      setFragmentedData(fragmentedDataCopy);
    }
  };
  const handleNewItemCreate = () => {
    if (inputValue.trim() != "") {
      const obj = {
        id: uuid(),
        title: inputValue,
        status: createNewItemStatus,
      };
      let fragmentedDataCopy = cloneDeep(fragmentedData);
      fragmentedDataCopy[createNewItemStatus].push(obj);
      setFragmentedData(fragmentedDataCopy);
      handleNewItemCancel(); //call to close popup once created
    } else {
      alert("Please enter into the input shown!");
    }
  };
  const handleNewItemCancel = () => {
    setCreateNewItemPopup(false);
    setCreateNewItemStatus("");
  };
  const handleNewItem = (status) => {
    setCreateNewItemPopup(true);
    setCreateNewItemStatus(status);
  };
  return (
    <Fragment>
      <div className="title">
        <div className="titleHeader">Kanban by Harsh Shah</div>
        <div className="searchBox">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search by status or title"}
          />
        </div>
      </div>
      <div className="appContainer">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {statusArray.map((status) => {
            return (
              <div className="columnContainer" key={status}>
                <div className="header">
                  <div className="text">{status}</div>
                  <div className="actions">
                    <Button
                      onClick={handleNewItem.bind(null, status)}
                      className="addNewItem"
                      type="button"
                      buttonType="positive"
                    >
                      Add New
                    </Button>
                  </div>
                </div>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <ul
                      className="list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {get(fragmentedData, [status], []).map(
                        ({ id, title, status }, index) => {
                          return (
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`listItem`}
                                >
                                  {title}
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      {createNewItemPopup && (
        <Overlay>
          <Popup
            positiveText={"Create"}
            title={`Create New Task - ${createNewItemStatus}`}
            negativeAction={handleNewItemCancel}
            negativeText={"Cancel"}
            positiveAction={handleNewItemCreate}
          >
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={"Enter a task"}
            />
          </Popup>
        </Overlay>
      )}
    </Fragment>
  );
}

export default App;
