import * as React from "react";
import Auth from "../Auth/Auth";
import { Location } from "history";
import { CoursesModel } from "./../models/Courses";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import './../css/Courses.css';

interface Props {
  history: History;
  location: Location;
  auth: Auth;
}
interface State {
  courses: CoursesModel[];
  message: string;
  adminRole: string;
}

class Courses extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      courses: [],
      message: "",
      adminRole: '',
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
      .then(response => this.setState({ adminRole: response.data }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <Container className="ContainerCourses">
        < GridList cols={1} className="GridListCourses">
          <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
            <ListSubheader component="div">
              <Typography variant="h5">
                Conferences
                </Typography>
            </ListSubheader>
          </GridListTile>
          {
            this.state.courses.map(course => (
              <GridListTile key={course.id} cols={1} style={{ height: 'auto', width: 'auto' }}>
                <img src="/img/cursos.jpg" alt="course" max-width="200px" />
                <GridListTileBar
                  title={course.title}
                  titlePosition="bottom" />
              </GridListTile>
            ))}
        </GridList >
        {this.state.adminRole && (<Typography>
        {console.log(this.state, 'state')}
         Role(s) message: {this.state.adminRole}
        </Typography>)}
      </Container >
    );
  }
}

export default Courses;
