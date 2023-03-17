const express = require('express'),
  morgan = require('morgan');

const app = express();

let movieList = [ 
  { id: 1,
    title: 'Star Wars: Episode I - The Phantom Menace',
    year: '1999',
    rating: 'PG',
    runtime: '136 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '6.5',
    description: 'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
    director: 'George Lucas',
    actors: 'Ewan McGregor, Liam Neeson, Natalie Portman, Jake Lloyd'
  },
  { id: 2,
    title: 'Star Wars: Episode II - Attack of the Clones',
    year: '2002',
    rating: 'PG',
    runtime: '142 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '6.6',
    description: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi discovers a secret clone army crafted for the Jedi.',
    director: 'George Lucas',
    actors: 'Hayden Christensen, Natalie Portman, Ewan McGregor, Christopher Lee'

  },
  { id: 3,
    title: 'Star Wars: Episode III - Revenge of the Sith',
    year: '2005',
    rating: 'PG-13',
    runtime: '140 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '7.6',
    description: 'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.',
    director: 'George Lucas',
    actors: 'Hayden Christensen, Natalie Portman, Ewan McGregor, Samuel L. Jackson'
  },
  { id: 4,
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    rating: 'PG',
    runtime: '121 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '8.6',
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    director: 'George Lucas',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Alec Guinness'
  },
  { id: 5,
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: '1980',
    rating: 'PG',
    runtime: '124 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '8.7',
    description: 'After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
    director: 'Irvin Kershner',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams'
  },
  { id: 6,
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: '1983',
    rating: 'PG',
    runtime: '131 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '8.3',
    description: 'After rescuing Han Solo from Jabba the Hutt, the Rebels attempt to destroy the second Death Star, while Luke struggles to help Darth Vader back from the dark side.',
    director: 'Richard Marquand',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams'
  },
  { id: 7,
    title: 'Star Wars: Episode VII - The Force Awakens',
    year: '2015',
    rating: 'PG-13',
    runtime: '138 min',
    genre: 'Action, Adventure, Sci-Fi',
    stars: '7.8',
    description: 'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.',
    director: 'J.J. Abrams',
    actors: 'Daisy Ridley, John Boyega, Oscar Isaac, Domhnall Gleeson'
  },
  { id: 8,
    title: 'Star Wars: Episode VIII - The Last Jedi',
    year: '2017',
    rating: 'PG-13',
    runtime: '152 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '6.9',
    description: 'The Star Wars saga continues as new heroes and galactic legends go on an epic adventure, unlocking mysteries of the Force and shocking revelations of the past.',
    director: 'Rian Johnson',
    actors: 'Daisy Ridley, John Boyega, Mark Hamill, Carrie Fisher'
  },
  { id: 9,
    title: 'Star Wars: Episode IX - The Rise of Skywalker',
    year: '2019',
    rating: 'PG-13',
    runtime: '141 min',
    genre: 'Action, Adventure, Fantasy',
    stars: '6.5',
    description: 'In the riveting conclusion of the landmark Skywalker saga, new legends will be born-and the final battle for freedom is yet to come.',
    director: 'J.J. Abrams',
    actors: 'Daisy Ridley, John Boyega, Oscar Isaac, Adam Driver'
  },
  { id: 10,
    title: 'Rogue One: A Star Wars Story',
    year: '2016',
    rating: 'PG-13',
    runtime: '133 min',
    genre: 'Action, Adventure, Sci-Fi',
    stars: '7.8',
    description: 'In a time of conflict, a group of unlikely heroes band together on a mission to steal the plans to the Death Star, the Empire\'s ultimate weapon of destruction.',
    director: 'Gareth Edwards',
    actors: 'Felicity Jones, Diego Luna, Alan Tudyk, Donnie Yen'
  },
  { id: 11,
    title: 'Solo: A Star Wars Story',
    year: '2018',
    rating: 'PG-13',
    runtime: '135 min',
    genre: 'Action, Adventure, Sci-Fi',
    stars: '6.9',
    description: 'Board the Millennium Falcon and journey to a galaxy far, far away in an epic action-adventure that will set the course of one of the Star Wars saga\'s most unlikely heroes.',
    director: 'Ron Howard',
    actors: 'Alden Ehrenreich, Woody Harrelson, Emilia Clarke, Donald Glover'
  },

]


app.get('/movies', (req, res) => {
  res.json(movieList);
});

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});


// using express.static to serve doc file which is stored in public folder
app.use(express.static('public'));

app.use(morgan('common'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});









