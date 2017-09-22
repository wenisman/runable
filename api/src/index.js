const app = require('express')();

app.get('/', (req, res) => {
  res.status(200).send('hi geoff');
});

app.listen(9000, () => {
  console.log('runable api - started on port 9000!');
});
