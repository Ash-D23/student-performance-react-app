import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

class LineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
     Data:{}
  }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  convert(data){
    let res=[0,0,0,0,0]

    for (let x of data){
      if(x.absences > 30) {
        res[4]+=1
      }else if (x.absences > 20){
        res[3]+=1
      }else if (x.absences > 10){
        res[2]+=1
      }else if (x.absences > 0) {
        res[1]+=1
      }else{
        res[0]+=1
      }
    }

    return res
  }

  componentDidMount() {
     axios.get('https://student-performance-app23.herokuapp.com/student/line')
          .then(response => {              
              this.setState({Data:{
                labels: ['0', '10', '20', '30', '>30'],
                datasets:[
                  {
                    label:'Absences',
                    data: this.convert(response.data),
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                    ]
                  }
                ]
              }});
          })
          .catch(function (error) {
              console.log(error);
          });

  }


  render(){
    return (
      <div className="chart">
			<Line
      data={this.state.Data}
			width={100}
			height={75}
      options={{
	    title:{
		  display:this.props.displayTitle,
		  text:'Students Attendance',
		  fontSize:35,
			maintainAspectRatio: false
	  }
   }}
    />
			</div>
			)
		}
	}


export default LineChart;
