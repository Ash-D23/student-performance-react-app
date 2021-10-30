import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'
import './styles.css';
/*
const Stu = props => (
    <tr className='completed'>
        <td>{props.data.name}</td>
        <td>{props.data.Gender}</td>
        <td>{props.data.average}</td>
        <td>
            <Link to={"/edit/"+props.data._id}>Edit</Link>
        </td>
        <td>
            <button onClick={props.handleDelete}>Delete</button>
        </td>
    </tr>
)*/

class Stu extends Component{

    handledel = (key, id) => {
        axios.post(`https://student-performance-app23.herokuapp.com/student/delete/${id}`)
            .then(response => {
                console.log(response)
                this.props.delh(key)
            })
            .catch(function (error) {
                console.log(error);
            })
        
    }

    render(){
        return (
            this.props.data.map((student, index)=> (
                <tr key={index} className='completed'>
                    <td>{student.name}</td>
                    <td>{student.Gender}</td>
                    <td>{student.average}</td>
                    <td>
                        <Link to={"/edit/"+student._id}>Edit</Link>
                    </td>
                    <td>
                        <p onClick={() => this.handledel(index, student._id)} ><i class="fas fa-trash-alt"></i></p>
                    </td>
                </tr>
            ))
        )
    }
}

export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    componentDidMount() {
        axios.get('https://student-performance-app23.herokuapp.com/student/')
            .then(response => {
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    delh = (i)=>{


        this.setState({students : this.state.students.filter((item , index)=> index!==i)})
    }



    render() {
        return (
            <div>
                <br />
                <h3>Students List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Average</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                     { this.state.students[0] ? (                             
                           <Stu data={this.state.students} delh={this.delh} />
                        )
                      : (<Loader />)  
                      }
                    </tbody>
                </table>
                <br />
                </div>
            )
        }
    }
