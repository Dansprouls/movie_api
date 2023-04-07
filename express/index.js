const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('../models.js');
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

const serverless = require('serverless-http')

mongoose.connect('mongodb://localhost:27017/flixDB', {useNewURLParser: true, useUnifiedTopology: true});

const app = express();
const router = express.Router;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('../auth')(app);
const passport = require('passport');
require('../passport');

const cors = require('cors');

//allows requests from all origins
app.use(cors());

/* 
let movies = [ 
  { id: 1,
    title: 'Star Wars: Episode I - The Phantom Menace',
    year: '1999',
    rating: 'PG',
    runtime: '136 min',
    genre: {
      name: 'Science Fiction',
      description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets. Subjective.'
    },
    stars: '6.5',
    description: 'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
    director: {
      name: 'George Lucas',
      bio: 'George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd',
      dob: 'May 14, 1944',
      birthplace: 'Modesto, California, USA',
    },
    actors: 'Ewan McGregor, Liam Neeson, Natalie Portman, Jake Lloyd'
  },
  { id: 2,
    title: 'Star Wars: Episode II - Attack of the Clones',
    year: '2002',
    rating: 'PG',
    runtime: '142 min',
    genre: {
      name: 'Science Fiction',
      description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets. Subjective.'
    },
    stars: '6.6',
    description: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi discovers a secret clone army crafted for the Jedi.',
    director: {
      name: 'George Lucas',
      bio: 'George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd',
      dob: 'May 14, 1944',
      birthplace: 'Modesto, California, USA',
    },
    actors: 'Hayden Christensen, Natalie Portman, Ewan McGregor, Christopher Lee'

  },
  { id: 3,
    title: 'Star Wars: Episode III - Revenge of the Sith',
    year: '2005',
    rating: 'PG-13',
    runtime: '140 min',
    genre: {
      name: 'Science Fiction',
      description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets. Subjective.'
    },
    stars: '7.6',
    description: 'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.',
    director: {
      name: 'George Lucas',
      bio: 'George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd',
      dob: 'May 14, 1944',
      birthplace: 'Modesto, California, USA',
    },
    actors: 'Hayden Christensen, Natalie Portman, Ewan McGregor, Samuel L. Jackson'
  },
  { id: 4,
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    rating: 'PG',
    runtime: '121 min',
    genre: {
      name: 'Adventure',
      description: 'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.'
    },
    stars: '8.6',
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    director: {
      name: 'George Lucas',
      bio: 'George Walton Lucas, Jr. (Modesto, California, May 14, 1944) is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd',
      dob: 'May 14, 1944',
      birthplace: 'Modesto, California, USA',
    },
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Alec Guinness'
  },
  { id: 5,
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: '1980',
    rating: 'PG',
    runtime: '124 min',
    genre: {
      name: 'Adventure',
      description: 'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.'
    },
    stars: '8.7',
    description: 'After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
    director: {
      name: 'Irvin Kershner',
      bio: 'Irvin Kershner was an American film director, actor, and producer of film and television. He gained notice early in his career as a filmmaker for directing quirky, independent drama films, while working as an influential lecturer at the University of Southern California. Later in his career, he transitioned to high-budget blockbusters such as The Empire Strikes Back, the James Bond adaptation Never Say Never Again and RoboCop 2.',
      dob: 'April 29, 1923',
      birthplace: 'Philadelphia, Pennsylvania, USA',
    },
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams'
  },
  { id: 6,
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: '1983',
    rating: 'PG',
    runtime: '131 min',
    genre: {
      name: 'Adventure',
      description: 'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.'
    },
    stars: '8.3',
    description: 'After rescuing Han Solo from Jabba the Hutt, the Rebels attempt to destroy the second Death Star, while Luke struggles to help Darth Vader back from the dark side.',
    director: {
      name: 'Richard Marquand',
      bio: 'Richard Marquand was born on September 22, 1937 in Llanishen, Cardiff, Glamorgan, Wales, UK. He was a director and producer, known for Star Wars: Episode VI - Return of the Jedi (1983), Jagged Edge (1985) and NBC Special Treat (1975).',
      dob: 'September 22, 1937',
      birthplace: 'Llanishen, Cardiff, Glamorgan, Wales, UK',
    },
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams'
  },
  { id: 7,
    title: 'Star Wars: Episode VII - The Force Awakens',
    year: '2015',
    rating: 'PG-13',
    runtime: '138 min',
    genre: {
      name: 'Action',
      description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
    },
    stars: '7.8',
    description: 'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.',
    director: {
      name: 'J.J. Abrams',
      bio: 'J.J. Abrams is an American filmmaker and composer. He is best known for his works in the genres of action, drama, and science fiction. Abrams wrote and produced such films as Regarding Henry (1991), Forever Young (1992), Armageddon (1998), Cloverfield (2008), Star Trek (2009), Star Wars: The Force Awakens (2015), and Star Wars: The Rise of Skywalker (2019).',
      dob: 'June 27, 1966',
      birthplace: 'New York City, New York, USA',
    },
    actors: 'Daisy Ridley, John Boyega, Oscar Isaac, Domhnall Gleeson'
  },
  { id: 8,
    title: 'Star Wars: Episode VIII - The Last Jedi',
    year: '2017',
    rating: 'PG-13',
    runtime: '152 min',
    genre: {
      name: 'Action',
      description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
    },
    stars: '6.9',
    description: 'The Star Wars saga continues as new heroes and galactic legends go on an epic adventure, unlocking mysteries of the Force and shocking revelations of the past.',
    director: {
      name: 'Rian Johnson',
      bio: 'Rian Johnson is an American filmmaker. He made his directorial debut with the neo-noir mystery film Brick (2005), which received positive reviews and grossed nearly $4 million on a $450,000 budget. Transitioning to higher-profile films, Johnson achieved mainstream recognition for writing and directing the science-fiction thriller Looper (2012) to critical and commercial success. Johnson landed his largest project when he wrote and directed the space opera Star Wars: The Last Jedi (2017), which grossed over $1 billion. He returned to the mystery genre with Knives Out (2019) and its sequel Glass Onion (2022), both of which earned him Academy Award nominations for Best Original Screenplay and Best Adapted Screenplay, respectively',
      dob: 'December 17, 1973',
      birthplace: 'Silver Spring, Maryland, USA',
    },
    actors: 'Daisy Ridley, John Boyega, Mark Hamill, Carrie Fisher'
  },
  { id: 9,
    title: 'Star Wars: Episode IX - The Rise of Skywalker',
    year: '2019',
    rating: 'PG-13',
    runtime: '141 min',
    genre: {
      name: 'Action',
      description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
    },
    stars: '6.5',
    description: 'In the riveting conclusion of the landmark Skywalker saga, new legends will be born-and the final battle for freedom is yet to come.',
    director: {
      name: 'J.J. Abrams',
      bio: 'J.J. Abrams is an American filmmaker and composer. He is best known for his works in the genres of action, drama, and science fiction. Abrams wrote and produced such films as Regarding Henry (1991), Forever Young (1992), Armageddon (1998), Cloverfield (2008), Star Trek (2009), Star Wars: The Force Awakens (2015), and Star Wars: The Rise of Skywalker (2019).',
      dob: 'June 27, 1966',
      birthplace: 'New York City, New York, USA',
    },
    actors: 'Daisy Ridley, John Boyega, Oscar Isaac, Adam Driver'
  },
  { id: 10,
    title: 'Rogue One: A Star Wars Story',
    year: '2016',
    rating: 'PG-13',
    runtime: '133 min',
    genre: {
      name: 'Science Fiction',
      description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets. Subjective.'
    },
    stars: '7.8',
    description: 'In a time of conflict, a group of unlikely heroes band together on a mission to steal the plans to the Death Star, the Empire\'s ultimate weapon of destruction.',
    director: {
      name: 'Gareth Edwards',
      bio: 'Gareth Edwards is a British filmmaker. He first gained widespread recognition for Monsters (2010), an independent film in which he served as writer, director, cinematographer, and visual effects artist.He subsequently directed Godzilla (2014), a reboot of Toho\'s Godzilla franchise and the first film in Legendary\'s MonsterVerse, and Rogue One: A Star Wars Story (2016), the first installment of the Star Wars anthology series and an immediate prequel to Star Wars: Episode IV – A New Hope (1977).',
      dob: 'June 1, 1975',
      birthplace: 'Nuneaton, Warwickshire, England, UK',
    },
    actors: 'Felicity Jones, Diego Luna, Alan Tudyk, Donnie Yen'
  },
  { id: 11,
    title: 'Solo: A Star Wars Story',
    year: '2018',
    rating: 'PG-13',
    runtime: '135 min',
    genre: {
      name: 'Science Fiction',
      description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets. Subjective.'
    },
    stars: '6.9',
    description: 'Board the Millennium Falcon and journey to a galaxy far, far away in an epic action-adventure that will set the course of one of the Star Wars saga\'s most unlikely heroes.',
    director: {
      name: 'Ron Howard',
      bio: 'Academy Award-winning filmmaker Ron Howard is one of this generation\'s most popular directors. From the critically acclaimed dramas A Beautiful Mind (2001) and Apollo 13 (1995) to the hit comedies Parenthood (1989) and Splash (1984), he has created some of Hollywood\'s most memorable films.',
      dob: 'March 1, 1954',
      birthplace: 'Duncan, Oklahoma, USA',
    },
    actors: 'Alden Ehrenreich, Woody Harrelson, Emilia Clarke, Donald Glover'
  },

]

let users = [ 
  {
    id: '1',
    username: 'Dan',
    email: 'dan@email.com',
    password: 'dan123',
    birthday: '10/15/1995',
    favoriteMovies : ["Star Wars: Episode III - Revenge of the Sith", "Star Wars: Episode V - The Empire Strikes Back"]
  },
  {
    id: '2',
    username: 'Han',
    email: 'han@email.com',
    password: 'han123',
    birthday: '10/14/1995',
    favoriteMovies : ["Star Wars: Episode V - The Empire Strikes Back"]
  },
  {
    id: '3',
    username: 'Stan',
    email: 'stan@email.com',
    password: 'stan123',
    birthday: '10/13/1995',
    favoriteMovies : ["Star Wars: Episode VII - The Force Awakens", "Rogue One: A Star Wars Story"]
  },
  {
    id: '4',
    username: 'Jan',
    email: 'jan@email.com',
    password: 'jan123',
    birthday: '10/12/1995',
    favoriteMovies : ["Solo: A Star Wars Story"]
  },
  {
    id: '5',
    username: 'Fran',
    email: 'fran@email.com',
    password: 'fran123',
    birthday: '10/11/1995',
    favoriteMovies : ["Star Wars: Episode V - The Empire Strikes Back", "Star Wars: Episode I - The Phantom Menace"]
  },

]
*/

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

//GET request to get a list of data on all movies
router.get('/movies', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET request to get data on a movie based on title
/*app.get('/movies/:title', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Movies.findOne({title: req.params.title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET request to get the genre of a movie based on title
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Movies.findOne({ 'genre.name': req.params.genreName})
    .then((movie) => {
      res.json(movie.genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET request to get data about the director of a selected movie title
app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Movies.findOne({ 'director.name': req.params.directorName })
    .then((movie) => {
      res.json(movie.director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: '+ err);
    });
});

//POST request to register new users 
app.post('/users',

  [
    check('username', 'Username is required').isLength({min:5}),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('Email','Email does not appear to be valid.').isEmail()
  ], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
  let hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({username: req.body.username})
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.username + 'already exists');
    } else {
      Users
        .create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
        })
        .then((user) => {res.status(201).json(user)})
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//GET request to get a user by username
app.get('/users/:username', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//PUT request to update username of an existing user
app.put('/users/:username', passport.authenticate('jwt', { session: false }), 
async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate({ username: req.params.username}, { $set:
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
      }
    },
    { new: true}); //ensures updated document is returned
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: '+ err);
  }
});

//POST request to add a movie to favorites list 
app.post('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), 
async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate({ username: req.params.username}, {
      $push: { favoriteMovies: req.params.movieID}
    },
    { new: true});
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

//DELETE request to remove a movie from favorites list 
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), 
async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate({ username: req.params.username}, {
      $pull: { favoriteMovies: req.params.movieID }
    },
    { new: true});
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

//DELETE request to deregister a user's account
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Users.findOneAndRemove({ username: req.params.username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// using express.static to serve doc file which is stored in public folder
app.use(express.static('public'));

app.use(morgan('common'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})

/*const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});*/

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;

module.exports.handler = serverless(app);










