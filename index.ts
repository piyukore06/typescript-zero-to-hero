interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = { title: 'Update tsconfig', description: 'enable strictNullChecks' };

updateTodo(todo1, { description: 'enable noImplicitAny' });