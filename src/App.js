import React,{useEffect, useState} from "react"
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./components/Todo";
import {db} from "./firebase"
import {query,collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
import Swal from 'sweetalert2'
const style={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-[5rem]`,
  heading:`text-3xl font-bold text-center text-gray-800 p-2`,
  form:`flex justify-between mb-10 pl-2`,
  input:`border p-2 w-full text-xl`,
  button:`border p-4 ml-2 bg-purple-400 text-slate-100`,
  count:`text-center p-2`
}
function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')
  console.log(input);
// create todo
const createTodo = async (e) => {
  e.preventDefault(e)
  if(input === ''){
    // alert('')
    Swal.fire(
      {
        title:'Please enter a valid todo',
        icon:'warning'
      }
    )
    return
  }
  await addDoc(collection(db,'todos'),{
    text: input,
    completed: false,
  })
  setInput('')
}
// read todo from firebase
useEffect(()=>{
  const q = query(collection(db, 'todos'))
  const unsubcribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = []
    querySnapshot.forEach((doc) => {
      todosArr.push({...doc.data(),id: doc.id})
    })
    console.log(todosArr)
    setTodos(todosArr)
  })
  return () => unsubcribe()
},[])
// update todo in firebase
const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id),{
    completed: !todo.completed
  })

}
// delete todo
const toggleDeleteTodo = async (id) => {
  await deleteDoc(doc(db,'todos',id))
}

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo"/>
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <ul>
          {todos.map((todo,i) => (
            <Todo key={i} todo={todo} toggleComplete={toggleComplete} toggleDeleteTodo={toggleDeleteTodo}/>
          ))}
        </ul>
        {todos.length < 1 ? null : 
        <p className={style.count}>{`You have ${todos.length} todos`}</p>
        }
      </div>
    </div>
  );
}

export default App;
