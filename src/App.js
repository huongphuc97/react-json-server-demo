import React, { Component } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
const api = axios.create({
  baseURL: `http://localhost:3000/posts`
})
class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    let items = await api.get('/').then(({ data }) => data);
    this.setState({ users: items })
  }
  createUser = async () => {
    await api.post('/', { id: 18, name: "json-z", author: "z" })
      .then(({ data }) => data)
    this.getUsers();
  }
  updateUser = async (id, data) => {
    await api.patch(`/${id}`, { name: data })
    this.getUsers();
  }
  deleteUser = async (id) => {
    await api.delete(`/${id}`)
    this.getUsers();
  }

  render() {
    return (
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button sx={{ m: 2, p: 2 }} color="secondary" variant="contained" onClick={() => this.createUser()}>Create</Button>
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(user =>
                <tr key={user.id}>
                  <td sx={{ m: 2, p: 2 }}>{user.name}</td>
                  <td sx={{ m: 2, p: 2 }}>{user.author}</td>
                  <td sx={{
                    display: 'flex',
                    justifyContent:'flex-end',
                  }} >
                    <Button sx={{ m: 2, p: 2 }} color="secondary" variant="contained" onClick={() => this.updateUser(user.id, `${user.name}EditedName`)}>Edit</Button>
                    <Button sx={{ m: 2, p: 2 }} color="secondary" variant="contained" onClick={() => this.deleteUser(user.id)}>Delete</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      </Container >
    );
  }
}

export default App;
