var React = require("react");

class login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h2>Log In</h2>
          <form method="POST" action="/userlogin">
            <div>
            Name: <input name="name" type="text" />
            </div>
            <div>
            Password: <input name="password" type="text" />
            </div>
            <input type="submit" value="login" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = login;