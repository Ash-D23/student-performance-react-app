import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeStudentname = this.onChangeStudentname.bind(this);
        this.onChangeStudentroll = this.onChangeStudentroll.bind(this);
        this.onChangeStudentfailures = this.onChangeStudentfailures.bind(this);
        this.onChangeStudentabsences = this.onChangeStudentabsences.bind(this);
        this.onChangeStudentgender = this.onChangeStudentgender.bind(this);
        this.onChangeStudentinternships = this.onChangeStudentinternships.bind(this);
        this.onChangeStudentaverage = this.onChangeStudentaverage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            roll: '',
            failures: '',
            absences: '',
            Gender:'',
            internships:'',
            average:''
        }
    }

    componentDidMount() {
        axios.get('https://student-performance-app23.herokuapp.com/student/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                  name: response.data.name,
                  roll: response.data.roll,
                  failures: response.data.failures,
                  absences: response.data.absences,
                  Gender: response.data.Gender,
                  internships: response.data.internships,
                  average: response.data.average
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeStudentname(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeStudentroll(e) {
        this.setState({
            roll: e.target.value
        });
    }

    onChangeStudentfailures(e) {
        this.setState({
            failures: e.target.value
        });
    }

    onChangeStudentabsences(e) {
        this.setState({
            absences: e.target.value
        });
    }

    onChangeStudentgender(e) {
        this.setState({
            Gender: e.target.value
        });
    }

    onChangeStudentinternships(e) {
      console.log(e.target.value)
        this.setState({
            internships: e.target.value
        });
    }

    onChangeStudentaverage(e) {
        this.setState({
            average: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
          name: this.state.name,
          roll: this.state.roll,
          failures: this.state.failures,
          absences: this.state.absences,
          Gender: this.state.Gender,
          internships: this.state.internships,
          average: this.state.average
        };
        axios.post('https://student-performance-app23.herokuapp.com/student/update/'+this.props.match.params.id, obj)
            .then(res => console.log("succesfull"))
            .catch(err => console.log("error: ", err));

        this.props.history.push('/');
    }

    render() {
        return (
          <div style={{marginTop: 20}}>
              <h3>Create New Student</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Name: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.name}
                              onChange={this.onChangeStudentname}
                              />
                  </div>
                  <div className="form-group">
                      <label>Roll No: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.roll}
                              onChange={this.onChangeStudentroll}
                              />
                  </div>
                  <div className="form-group">
                      <div className="form-check form-check-inline">
                          <input  className="form-check-input"
                                  type="radio"
                                  name="priorityOptions"
                                  id="priorityLow"
                                  value="M"
                                  checked={this.state.Gender == 'M'}
                                  onChange={this.onChangeStudentgender}
                                  />
                          <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input  className="form-check-input"
                                  type="radio"
                                  name="priorityOptions"
                                  id="priorityMedium"
                                  value="F"
                                  checked={this.state.Gender == 'F'}
                                  onChange={this.onChangeStudentgender}
                                  />
                          <label className="form-check-label">Female</label>
                      </div>

                  </div>
                  <div className="form-group">
                      <label>Failures: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.failures}
                              onChange={this.onChangeStudentfailures}
                              />
                  </div>
                  <div className="form-group">
                      <label>Absences: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.absences}
                              onChange={this.onChangeStudentabsences}
                              />
                  </div>
                  <div className="form-group">
                      <label>Average: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.average}
                              onChange={this.onChangeStudentaverage}
                              />
                  </div>

                  <div className="form-group">
                    <label className="form-check-label">Internship: </label>
                      <div className="form-check form-check-inline">
                          <input  className="form-check-input"
                                  type="radio"
                                  name="iOptions"
                                  id="iLow"
                                  value='1'
                                  checked={this.state.internships=='1'}
                                  onChange={this.onChangeStudentinternships}
                                  />
                          <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input  className="form-check-input"
                                  type="radio"
                                  name="iOptions"
                                  id="priorityMedium"
                                  value='0'
                                  checked={this.state.internships=='0'}
                                  onChange={this.onChangeStudentinternships}
                                  />
                          <label className="form-check-label">No</label>
                      </div>

                  </div>

                  <div className="form-group">
                      <input type="submit" value="Edit Student" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}
