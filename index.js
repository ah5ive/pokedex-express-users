/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */
//database pokemons users users_pokemon pokemon
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
// Initialise postgres client
const config = {
  user: 'Haruspring',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

        //set var visit to count visits
        var visits;
        console.log("current visits", request.cookies['homevisits']);

        if(request.cookies['homevisits'] === undefined){

            visits = 1;
        } else {

            visits = parseInt(request.cookies['visits']) + 1;
        }

        response.cookie('homevisit',visits);
      // redirect to home page
      response.render( 'pokemon/home', {pokemon: result.rows} );
    }
  });
}

const getNew = (request, response) => {

  response.render('pokemon/new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;

  const queryString = 'INSERT INTO pokemon(name, img, weight, height) VALUES($1, $2, $3, $4)';
  const values = [params.name, params.img, params.weight, params.height];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {

      console.log("update", result.rows.id)
      console.log('query post result:', result.rows);

      // redirect to home page
      response.redirect('/');
    }
  });
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemonForm = (request, response) => {
    let id = request.params['id'];

    const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';

    console.log(queryString);

    pool.query(queryString,(err, result)=>{
        if(err){
            console.error('delete Query error', err);
        } else {
            console.log('delete Query result:',result.rows[0]);

            response.render('pokemon/delete',{pokemon: result.rows[0]});
        }
    })
}

const deletePokemon = (request, response) => {
    let id = request.params['id'];

    const queryString = 'DELETE FROM pokemon WHERE id = ' + id + ';';
    // const queryString = 'DELETE FROM pokemon WHERE pokemon.name =' ;
    pool.query(queryString,(err,result)=>{
            console.log("Delete pokemon",result.rows);

            if(err){
                console.log("delete pokemon got error", err);

                response.status(500).send("GG!");
            } else {
                response.redirect('/');
            }
    })

}
/**
  =========================
* Catch
  ========================
*/

const getUserCatchForm = (request, response)=>{

    response.render('users/getusercatch');
}

const getUserPokemon = (request, response) => {
    console.log("====",request.body);

  let params = request.body;

  const queryString = 'INSERT INTO users_pokemon (user_id, pokemon_id) VALUES($1, $2) RETURNING user_id';

  const values = [params.user_id, params.pokemon_id];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {

      console.log('user_pokemon post result:', result.rows);

      // redirect to home page
      response.send("userpokemon catch");
    }
  });
};

/**
 * ===================================
 * User
 * ===================================
 */

 //SELECT pokemon_id, pokemon.name FROM users_pokemon INNER JOIN pokemon ON users_pokemon.pokemon_id = pokemon.id WHERE users_pokemon.user_id = 1;

const users = (request,response)=>{

    const queryString = 'SELECT * from users;'

    pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'users/users', {users: result.rows} );
    }
  });

}


const userNew = (request, response) => {

  response.render('users/new');
}

const userCreate = (request, response) => {

  let params = request.body;

  const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';

  const values = [params.name, params.password];

  console.log(queryString);

  pool.query(queryString, values, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

      console.log('create query result:', result.rows);

       response.cookie('signin', 'true');

        let createdId = result.rows[0].id;

        console.log('created:'+ createdId)
      // redirect to home page
      response.redirect('/');
    }
  });
}

const userId = (request,response)=>{

    let id = request.params.id;

    const queryString = 'SELECT users_pokemon.user_id, users.name AS trainername, pokemon.name AS pokemonname FROM pokemon INNER JOIN users_pokemon ON (pokemon.id = users_pokemon.pokemon_id) INNER JOIN users ON (users_pokemon.user_id = users.id) WHERE users_pokemon.user_id =' + id + ';';

    console.log("qString",queryString);

    pool.query(queryString,(err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

      console.log('userId result:', result.rows);

      response.render('users/userid', {userId: result.rows});
    }
  });


}

//============
 // cookies test
//============

const cookieTest = (request, response) => {

    console.log("COOKIE TEST: ", request.cookies);

    let message = "welcome to our site!"

    if(request.cookies['signin'] === 'true'){

        // 'your logged in';
        response.send('you are logged in!');
    }else{
        // 'your not logged in';
        // response.redirect('/')
        response.send('you are not logged in!');

    }
    response.send(message);
};

const logout =(request,response)=>{
    response.clearCookie('signin');
    response.send('you are log out');
}

const loginForm = (request,response)=>{

    response.render('users/login');
    //set cookie
}

const login = (request,response)=>{

    let params = request.body;
    console.log(params.name);

    const queryString = "SELECT * from users WHERE name ='"+ params.name + "';";


    pool.query(queryString, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

        console.log('sign in query result:', result.rows);


        if(params.name === result.rows[0].name && params.password === result.rows[0].password){

            response.cookie('signin', 'true');

            response.redirect('/user/' + result.rows[0].id);

        } else {


            response.send("User Not Found")
        }

        //let createdId = result.rows[0].id;

        //console.log('created:'+ createdId)
      // redirect to home page

    }
  });


}


/**
 * ===================================
 * Routes

SELECT users.id, users.name,users_pokemon.user_id,pokemon.name FROM users INNER JOIN users_pokemon ON users_pokemon.user_id = users.id INNER JOIN pokemon ON users_pokemon.pokemon_id = pokemon.id;

SELECT users_pokemon.user_id, users.name AS trainername, pokemon.name AS pokemonname FROM pokemon INNER JOIN users_pokemon ON (pokemon.id = users_pokemon.pokemon_id) INNER JOIN users ON (users_pokemon.user_id = users.id) WHERE users_pokemon.user_id

SELECT users.id, users.name, users_pokemon.user_id, pokemon.name FROM pokemon INNER JOIN users_pokemon ON (pokemon.id = users_pokemon.pokemon_id) INNER JOIN users ON (users_pokemon.user_id = users.id) WHERE users_pokemon.user_id = 1;
 * ===================================
 */

app.get('/', getRoot);

app.get('/pokemon/:id/edit', editPokemonForm);

app.get('/pokemon/:id/delete', deletePokemonForm);

app.get('/pokemon/new', getNew);

app.get('/pokemon/:id', getPokemon);
///pokemon/:id/delete
app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users

//get form
app.get('/users/new', userNew);

app.get('/testcookie',cookieTest);

app.get('/login',loginForm);

app.post('/userlogin',login);

app.post('/logout',logout);

app.get('/allusers', users);

app.get('/user/catch', getUserCatchForm);

app.get('/user/:id', userId)

app.post('/users', userCreate);

// user_pokemon form
app.post('/user/caught', getUserPokemon);
///user/caught

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


