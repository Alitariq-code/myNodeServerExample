const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const { dirname } = require('path');
const { nextTick } = require('process');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('we are staring working with midleware');
  next();
});
app.use((req, res, next) => {
  req.usermame = 'Ali tariq';
  next();
});
app.use((req, res, next) => {
  req.useraddress = 'lodhran';
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({ name: 'ali', adress: 'lodhran' });
//   console.log(req);
// });
// app.post('/', (req, res) => {
//   res.send('ho gaya tera kam');
//   console.log('oye dali k bachay meray pass reqyest ayi hai teri');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

const getAlltour = (req, res) => {
  res.status(200).json({
    status: 'sucsses',
    results: tours.length,
    requestedby: req.usermame,
    adress: req.useraddress,
    data: {
      tours,
    },
  });
};
const getsingleTour = (req, res) => {
  console.log(req.params.id);
  const index = req.params.id;
  const newData = tours[index];
  if (newData) {
    res.status(200).json({
      status: 'sucsses',
      data: {
        tour: newData,
      },
    });
  } else {
    console.log('data nahi mull raa');
    res.status(404).send('daata ahi hai bhai');
  }
};

const delTour = (req, res) => {
  res.status(204).json({
    sucsses: 'sucsses',
    data: 'ad',
  });
};

const addTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newtour = Object.assign({ id: id }, req.body);
  tours.push(newtour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        sucsses: 'sucesss',
        data: {
          tour: newtour,
        },
      });
      console.log(req.body);
    }
  );
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    sucsses: 'not sucssesfull',
    maseg: 'this route is not defined yet',
  });
  console.log(req.body);
};
const delUser = (req, res) => {
  res.status(500).json({
    sucsses: 'not sucssesfull',
    maseg: 'this route is not defined yet',
  });
};
const getsingleUser = (req, res) => {
  res.status(500).json({
    sucsses: 'not sucssesfull',
    maseg: 'this route is not defined yet',
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    sucsses: 'not sucssesfull',
    maseg: 'this route is not defined yet',
  });
};

// app.get('/api/tours', getAlltour);

// app.delete('/api/tours/:id', delTour);

// app.get('/api/tours/:id', getsingleTour);

// app.post('/api/tours', addTour);

// app.get('/api/Users', getAllUsers);

// app.delete('/api/Users/:id', delUser);

// app.get('/api/Users/:id', getsingleUser);

// app.post('/api/users', addUser);
// app.route('/api/tours').get(getAlltour).post(addTour);
// app.route('/api/tours/:id').get(getsingleUser).delete(delTour);

// app.route('/api/Users').get(getAllUsers).post(addUser);
// app.route('/api/Users/:id').get(getsingleUser).delete(delUser);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAlltour).post(addTour);
tourRouter.route('/:id').get(getsingleTour).delete(delTour);
userRouter.route('/').get(getAllUsers).post(addUser);
userRouter.route('/:id').get(getsingleUser).delete(delUser);

app.use('/api/tours', tourRouter);
app.use('/api/Users', userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port} `);
});
