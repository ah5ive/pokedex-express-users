var React = require("react");

class usersCreated extends React.Component {
  render() {
    console.log("Pokemon trainer", this.props.users)
    return (
            <div>
            <h3>Pokemon Trainers</h3>
            <ul>
            {this.props.users.map(users => (
              <li key={users.id}>
                {users.name}
              </li>
            ))}
          </ul>
          </div>
    );
  }
}

module.exports = usersCreated;