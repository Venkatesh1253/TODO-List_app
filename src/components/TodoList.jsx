import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTodos } from "../redux/actions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter = (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the new order
    dispatch(reorderTodos(items));
  };
  console.log('Filtered Todos:', filteredTodos);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            <li className="my-2 text-sm italic">All Your Notes Here...</li>
            <br />
            {filteredTodos.length === 0 ? (
              <p className="text-red-500">No todos.</p>
            ) : (
              filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={todo} index={index} />
                    </li>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
