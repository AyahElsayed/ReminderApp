import React, { Component } from 'react'
import {connect} from 'react-redux'
import {add_Reminder , remove_Reminder , clear_Reminders} from '../src/actions'
import moment from 'moment'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import logo from '../src/reminder.webp'
 class App extends Component {
  state = {
    text : '',
    date : new Date(),
  }

  render_Reminders = () =>{
    const {reminders} = this.props;
    return (
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return(
              <li key={reminder.id} className="list-group-item">
                <div>{reminder.text} </div>
                <div>{moment(new Date(reminder.date)).fromNow()} </div>
                <div className="closeicon btn btn-danger"
                 onClick={ ()=> this.props.remove_Reminder(reminder.id) }>X</div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    return (
      <div className="App">
        <img src={logo} />
        <div className="reminder-title">
          <h2>What Should U Do ?</h2>
        </div>
        <input
            className="form-control"
            type="text" 
            value={this.state.text}
            placeholder="Enter What U think... ? "
            onChange={(e)=> this.setState({text: e.target.value})} // الحاجة الي هكتبها هيحفظها
        />
        {/* <input
            className="form-control"
            type="datetime-local"
            value={this.state.date} // بيفضيلي المكان بعد ما اكتب ادوس ادد
            onChange={(e)=> this.setState({date: e.target.value})}
        /> */}
        <DatePicker 
          className="form-control "
          value={this.state.date}
          placeholderText="Enter Date"
          selected={this.state.date}
          onChange={(date)=> {this.setState({date})}}
          showTimeSelect                  //عشان يقبل الوقت
          timeFormat="HH:mm"     
          dateFormat="MMM d,yyy h:mm aa"
          timeCaption="time"
        />

        
        <button 
          onClick = { ()=> {
             this.props.add_Reminder(this.state.text , this.state.date) 
             this.setState({text: "" , date: ""})
            }
            }
          className="btn btn-primary btn-block">Add reminder
        </button>
        {this.render_Reminders()}
        <button
          onClick = { ()=> {
            this.props.clear_Reminders()
          }}
         className="btn btn-danger btn-block">
           Clear reminders
         </button>
        
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return{
//     add_Reminder: () => dispatch(add_Reminder())
//   }
// }      === {add_Reminder}

///////////////////////////////////////////////////////

// function mapStateToProps(state) {
//   return{
//     reminders: state
//   }
// }

export default connect(state => {
  return{
    reminders: state
  }
} , {add_Reminder,remove_Reminder , clear_Reminders}) (App) 