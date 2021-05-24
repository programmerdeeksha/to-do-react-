

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Header from './components/Header';
import Footer from './components/Footer';

import Tasks from './components/Tasks';
import About from './components/About';

import AddTask from './components/AddTask'
function App() {

  const [showAddTask, setShowAddTask]= useState(false)

  const [tasks, setTasks]= useState([])

  useEffect(()=>{
    const fetchTasks= async()=>{
      const res= await fetch('http://localhost:5000/tasks')
      const data = await res.json()
       setTasks(data);
      //return data;
    }
    fetchTasks()
  },[])

const addTask=async (task) => {
  //  const id= Math.floor(Math.random()*1000)+1;
  //  const newTask= {id, ...task}
  //  setTasks([...tasks,newTask])

  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body: JSON.stringify(task),
  })

  const data= await res.json()
  setTasks([...tasks,data])
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
   setTasks(tasks.filter((task)=>task.id!==id))
}


const toggleReminder=(id) => {
 setTasks(
   tasks.map((task)=>
   task.id===id?{
     ...task,reminder:!task.reminder
   }:task
   )
 )
}
const setAddTask=()=>{
   setShowAddTask(true);
}
const unsetTaskAdd=()=>{
  setShowAddTask(false);
}
  return (
    <Router>
    <div className="container">
      <Header title="Task Tracker" onclick={setAddTask}/>
    
 <Route path='/' exact  render={(props)=>(
   <>
  {showAddTask&&<AddTask onAdd={addTask} onclick={unsetTaskAdd} />}
      { tasks.length>0?<Tasks 
       tasks={tasks}
       onDelete={deleteTask} 
       onToggle={toggleReminder}/>:'No task to do'}
   </>

 )} />
<Route path='/about' component ={About}/>


    <Footer/>
    
    </div>
    </Router>
  );
}

export default App;
