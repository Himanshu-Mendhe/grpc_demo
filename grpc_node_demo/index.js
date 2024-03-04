const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
//const todosProto = grpc.load('todo.proto');

const packageDefinition = protoLoader.loadSync('./todo.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var todoService = protoDescriptor.TodoService;

const server = new grpc.Server();

const todos = [
    {
        id: '1', title:'Todo1', content:'content of todo 1'
    },
    {
        id: '2', title:'Todo2', content:'content of todo 2'
    }
]

server.addService(todoService.service, {
    ListTodos: (call, callback) => {
        callback(null, {
            todos: todos
        });
    },
    CreateTodo: (call, callback) => {
        let incomingewTodo = call.request;
        todos.push(incomingewTodo);
        console.log(todos);
        callback(null, incomingewTodo);
    },
    GetTodo: (call, callback) => {
        let incomingTodoRequest = call.request;
        let todoId = incomingTodoRequest.id;
        const request = todos.filter((todo) => todo.id == todoId);
        if (response.length>0){
            callback(null, response);
        }
        else{
            callback({
                message: 'Todo not found'
            },null);
        }
    }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('started the server');
    //server.start();  ---  depreciated
})