import * as React from "react";
import Auth from "./Auth/Auth";
import { Location } from "history";
import { CoursesModel } from "./models/Courses";

interface Props {
  history: History;
  location: Location;
  auth: Auth;
}
interface State {
  courses: CoursesModel[];
  message:string;
}

class Courses extends React.Component<Props, State> {
 
   constructor(props: Props) {
    super(props);
    this.state = {
      courses: [],
      message:""
    }
  }
  
 

  componentDidMount() {
    fetch("/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ courses: response.courses }))
      .catch(error => this.setState({ message: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => console.log(response))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <ul>
        {this.state.courses.map(course => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    );
  }
}

export default Courses;
