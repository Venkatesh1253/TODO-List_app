// Todo.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import toast from 'react-hot-toast';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/actions';

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addTodoError, setAddTodoError] = useState('');

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
      setAddTodoError('');
      toast.success('Todo task added successfully')
    } else {
      setAddTodoError('Please enter a todo');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  /*return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>React TODO APP</h2>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>
      {addTodoError && <p className="text-red-500">{addTodoError}</p>} 
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TodoList />
    </div>
  );
};*/
return (
  <div className="container">
    <h2 className="title">React TODO APP</h2>
    <div className="input-group">
      <input
        id="addTodoInput"
        className="input"
        type="text"
        placeholder="Add Todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button
        className="button"
        onClick={handleAddTodoClick}
      >
        <BsPlus size={20} />
      </button>
    </div>
    {addTodoError && <p className="error">{addTodoError}</p>}
    <div className="filter-search-group">
      <FilterButtons />
      <div className="input-group">
        <input
          className="input"
          type="text"
          placeholder="Search Todos"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button className="button">
          <BsSearch size={20} />
        </button>
      </div>
    </div>
    <TodoList />
  </div>
);
}

export default Todo;