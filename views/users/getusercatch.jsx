var React = require("react");

class userCatch extends React.Component {
  render() {
    console.log("CATCH POKEMON FORM")
    return (
      <html>
        <head />
        <body>
        <h2>Pokemon Catch</h2>
          <form className="usercatchform" method="POST" action="/user/caught">
            <div>
              User: <input name="user_id" type="text" />
            </div>
            <div>
              Pokemon Catch: <input name="pokemon_id" type="text" />
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = userCatch;