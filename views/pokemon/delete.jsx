var React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>{this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action= {"/pokemon/"+ this.props.pokemon.id + "?_method=delete"}
          >
            <input type="submit" value="Confirm delete" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;