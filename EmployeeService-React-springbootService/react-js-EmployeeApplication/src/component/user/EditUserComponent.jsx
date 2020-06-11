import React, { Component } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        UserService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data.result;
                this.setState({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                salary: user.salary,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        UserService.editUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/list-user');
            });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Edit User</Typography>
                    <form>

                        <TextField label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} disabled/>

                        <TextField label="FIRST NAME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="LAST NAME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField type="number" label="AGE" fullWidth margin="normal" name="age" value={this.state.age} onChange={this.onChange}/>

                        <TextField type="number" label="SALARY" fullWidth margin="normal" name="salary" value={this.state.salary} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                    </form>
                </Container>
            </React.Fragment>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;