var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <ul className="pokemon-list">
                <img src = {this.props.pokemon.img}/>
              <li className="pokemon-attribute">
                id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                name: {this.props.pokemon.name}
              </li>
              <li className="pokemon-attribute">
                img: <a href={this.props.pokemon.img} target="_blank">{this.props.pokemon.img}</a>
              </li>
              <li className="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>

            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
