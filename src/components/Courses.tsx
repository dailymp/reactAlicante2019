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
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

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
      .then(response => this.setState({ adminRole: response.message.toString() }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    this.state.adminRole && store.addNotification({
      title: "Private api resource!",
      message: this.state.adminRole,
      type: "success",
      insert: "center",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 8000,
        onScreen: true
      }
    });
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
        <ReactNotification
        />
      </Container >
    );
  }
}

export default Courses;
