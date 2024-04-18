/* 
--useState vs useReducer--

useState:
    - Ideal for single, independent pieces of state (e.g. a boolean, 
        a string, a number, single object or array);
    - Logic to update state is placed directly in event handlers or
        effects, spread all over one or more components;
    - State is updated by calling a setter function with the new value;
    - Imperative state updates: state transitions are directly 
        implemented in the event handler or effect;

useReducer:
    - Ideal for multiple related pieces of state and complex state 
    (e.g. object with many values and nested objects or arrays);
    - Logic to update state is centralized in a reducer function,
        decoupled from the components that dispatch actions;
    - State is updated by dispatchin an action to a reducer function
        that returns the new state;
    - Declarative state updates: complex state transitions are 
        mapped to actions and handled by the reducer function;

When to use useReducer:
    - When you have complex state transitions that are hard to 
        express with useState;
    - When you have multiple pieces of state that are closely 
        related and need to be updated together;
    - When you have state logic that is shared between multiple 
        components and you want to avoid prop drilling;
    - When you have state logic that is complex and you want to 
        centralize it in one place;
    - When you want to test state logic in isolation from the 
        components that use it;
    - When you want to use middleware or other advanced features 
        like undo/redo, state persistence, etc.



*/
