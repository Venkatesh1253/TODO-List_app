import { useDispatch, } from 'react-redux';
import { useState } from 'react';
import {
  toggleTodo,
  removeTodo,
  editTodo,
  markCompleted,
  markIncomplete,
} from '../redux/actions';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes ,FaEdit, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editError, setEditError] = useState('');
  const handleEdit = () => {
    if (editMode) {
      if (editText.trim() !== '') {
        dispatch(editTodo(index, editText));
        setEditMode(false);
        setEditError('');
        toast.success('Updated Successfully')
      } else {
        setEditError('not be empty'); // Set error message if text is empty
      }
    } else {
      setEditMode(true);
    }
  };
  const handleDelete=()=> {
    dispatch(removeTodo(index))
    toast.success('Successfully Deleted')
  }
  const handleChange = (e) => {
    setEditText(e.target.value); // Update the editText state as the user types
  };
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">
          {index + 1}.
        </span>
        {editMode ? ( // Render input field when in edit mode
        <>
          <input
            type="text"
            className="mr-4 w-full py-1 px-2 border rounded"
            value={editText}
            onChange={handleChange}
          />
          {editError && <p className="text-red-500">{editError}</p>}
        </>
        ) : (
          <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-xs">{todo.timestamp}</p>
      </div>
      <div className='space-x-3 ml-8'>
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(toggleTodo(index))}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => {
            if (!editMode) {
              setEditText(todo.text);
            }
            handleEdit();
          }}
        >
          {editMode ? <FaSave /> : <FaEdit />} {/* Toggle between edit and save icon based on edit mode */}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={()=>handleDelete()}
        >
          <FaTrash />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
