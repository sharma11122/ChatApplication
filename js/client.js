
const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');

const messageInput=document.getElementById('messageInp')

const messageContainer=document.querySelector(".container")

var audio=new Audio('tune.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    
}

const name= prompt("Enter your name");
socket.emit('new-user-joined', name);

 
socket.on('user-joined',name=>{
   append(`${name} joined the chat`,'right');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';//ek baar msg jane k baad khali ho gye
})


socket.on('recieve',data=>{
    append(`${data.name} : ${data.message}`,'left');
 });

 socket.on('leave',data=>{
    append(`${name} left the chat`,'left');
 });

