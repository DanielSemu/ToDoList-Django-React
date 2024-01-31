import React, { Component } from 'react'
import './App.css';
import CustomModal from './components/Modal';
import axios from 'axios';


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      modal :false,
      viewCompleted:false,
      activeItem:{
        title:'',
        description:'',
        completed:false
      },
      todoList :[]
    }
  }
componentDidMount(){
  this.refreshList()
}
refreshList=()=>{
  axios.get('http://localhost:8000/api/tasks/').then(res=>this.setState({todoList:res.data})).catch(err=>console.log(err))
}


toggle =()=>{
  this.setState({modal :!this.state.modal})
}
handelSubmit =item=>{
  this.toggle()
  if(item.id){
    axios.put(`http://localhost:8000/api/tasks/${item.id}/`,item).then(res=>this.refreshList())
  }
  axios.post('http://localhost:8000/api/tasks/', item).then(res=>this.refreshList())
}
handelDelete =item=>{
  axios.delete(`http://localhost:8000/api/tasks/${item.id}/`).then(res=>this.refreshList())
}
createItem=()=>{
  const item={title:"",modal:!this.state.modal}
  this.setState({activeItem:item, modal: !this.state.modal})
}
editItem =item=>{
  this.setState({activeItem:item, modal:!this.state.modal})
}

displayCompleted =status=>{
  if(status){
    return this.setState({viewCompleted :true})
  }
  return this.setState({viewCompleted :false})
}


renderTabList=()=>{
  return(
    <div className='my-5 tab-list'>
      <span 
      onClick={()=>this.displayCompleted(true)}
      className={this.state.viewCompleted?"active":""}
      >
        Completed
      </span>
      <span 
      onClick={()=>this.displayCompleted(false)}
      className={this.state.viewCompleted?"":"active"}
      >
        InCompleted
      </span>

    </div>
  )
}
// rendering items
renderItems =()=>{
  const {viewCompleted} =this.state
  const newItems =this.state.todoList.filter(
    item=>item.completed ===viewCompleted
  )
  return newItems.map(item=>(
    <li key={item.id}
    className='list-group-item d-flex justify-content-between align-items-center'
    >
      <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" :""}`} title={item.title}>
        {item.title}
      </span>
      <span>
        <button onClick={() => this.editItem(item)} className='btn btn-info mx-2'>Edit</button>
        <button onClick={() => this.handelDelete(item)}  className='btn btn-danger mx-2'>Delete</button>
      </span>
    </li>
  ))
}


render(){
  return(
    <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-white text-uppercase text-center my-4'> task manager</h1>
        <div className='row'>
          <div className='col-md-6 col-sma-10 mx-auto p-0'>
            <div className='card p-3'>
              <div>
                <button onClick={()=>this.toggle()} className='btn btn-warning'>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className='list-group list-group-flush'>
              {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className='my-3 mb-2 bg-info text-white text-center'>
      Copyright 2023 $copy; All Right Reserved
        </footer>
        {this.state.modal?(
          <CustomModal activeItem={this.state.activeItem} toggle={this.toggl} onSave={this.handelSubmit}/>
        ):null}
    </main>
  )
}


}
export default App;

