const { mongo } = require('../services/db');
const LotMap = require('../services/LotMap');

const data = [
  {
    timestamp: new Date('2020-03-25T01:56:52.311Z'),
    event: 2
  },
  {
    timestamp: new Date('2020-03-25T01:57:52.311Z'),
    event: 3
  },
  {
    timestamp: new Date('2020-03-25T01:58:52.311Z'),
    event: -1
  },
  {
    timestamp: new Date('2020-03-25T02:00:52.311Z'),
    event: -1
  },
  {
    timestamp: new Date('2020-03-25T02:56:52.311Z'),
    event: 3
  },
  {
    timestamp: new Date('2020-03-25T03:56:52.311Z'),
    event: 2
  },
  {
    timestamp: new Date('2020-03-25T04:56:52.311Z'),
    event: 1
  },
  {
    timestamp: new Date('2020-03-26T02:56:52.311Z'),
    event: 2
  },
  {
    timestamp: new Date('2020-03-27T02:56:52.311Z'),
    event: -2
  },
  {
    timestamp: new Date('2020-03-27T02:56:53.311Z'),
    event: 1
  },
  {
    timestamp: new Date('2020-03-28T02:56:52.311Z'),
    event: -1
  },
  {
    timestamp: new Date('2020-03-28T02:59:52.311Z'),
    event: -1
  },
];

exports.generateData = () => {

  // Record event in map
  data.forEach((event) => {
    LotMap.record('lot', event.event, (err) => { if (err) console.error(err) });
  });

  mongo((err, db) => {
    if (err) console.error(err);
    else {
      // Remove all documents
      db.collection('lot')
        .remove({}, (err, res) => {
          if (err) console.error(err);
          else {
            // Insert into database
            db.collection('lot')
              .insert(data, (err, res) => {
                if (err) console.error(err);
                else console.log("Created test events");
              });
          }
        });
    }
  });

};
