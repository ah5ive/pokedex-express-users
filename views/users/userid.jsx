var React = require("react");

class userId extends React.Component {
  render() {
    console.log("Pokemon trainer", this.props.userId)
    return (
            <div>
            <h3>{this.props.userId[0].trainername} caught</h3>
             <ul>
            {this.props.userId.map(userId => (
              <li key={userId.id}>
                {userId.pokemonname}
              </li>
            ))}
          </ul>
            <form method="POST" action="/logout">
            <input type="submit" value="logout"/>
            </form>
          </div>
    );
  }
}

module.exports = userId;