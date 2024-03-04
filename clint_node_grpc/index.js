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

const client = new todoService('localhost:50051', grpc.credentials.createInsecure())

client.ListTodos({}, (err, todos) => {
    if(!err){
        console.log(todos);
        client.createTodo({id:3, content: "create todo", title: 'third Todo'}, (err, todo) => {
            if(!err){
                console.log('created new tod')
            }
            else{
                console.log(err);
            }
        })
    }
})