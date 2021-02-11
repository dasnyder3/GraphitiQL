const fs = require('fs');

export default async (req, res) => {
  if (req.method === 'POST') {
    const {code} = req.body;
    // console.log(code);
    // res.setHeader('content-disposition', 'attachment; filename=schema.js');
    res.setHeader('content-type', 'application/json')
    // res.setHeader('response-type', 'blob');
    res.status(200).send(code);
  } else {
    res.status(400).json(`${req.method} is not handled!`);
  }
}