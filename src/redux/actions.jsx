// actions.js
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  MARK_COMPLETED,
  REORDER_TODOS,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
} from './actionTypes';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text,timestamp: new Date().toLocaleString() ,id: Date.now()},
});

export const editTodo = (id,text) => ({
  type: EDIT_TODO,
  payload: { id,text },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});
export const reorderTodos = (todos) => ({
  type: 'REORDER_TODOS',
  payload: todos,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const markCompleted = (id) => ({
  type: MARK_COMPLETED,
  payload: { id },
});

export const markIncomplete = (id) => ({
  type: MARK_INCOMPLETE,
  payload: { id },
});

export const filterTodos = (filter) => ({
  type: FILTER_TODOS,
  payload: { filter },
});

export const markAllCompleted = () => ({
  type: MARK_ALL_COMPLETED,
});

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { searchTerm },
});
