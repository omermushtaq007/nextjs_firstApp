const { connectToDatabase } = require('../../../utils/db');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return res.json({
        message: 'get request from customers',
      });
    }
    case 'PATCH': {
      return customerById(req, res);
    }
    case 'PUT': {
      return editCustomer(req, res);
    }
  }
}

export async function customerById(req, res) {
  // console.log(req.body);
  let { db } = await connectToDatabase();

  let data = await db
    .collection('ems')
    .findOne({ _id: new ObjectId(req.body) });
  // console.log(data);
  if (!data) {
    throw new Error();
  }
  return res.json(data);
}

export async function editCustomer(req, res) {
  let { db } = await connectToDatabase();
  req.body.map(async (value) => {
    let data = await db.collection('ems').updateOne(
      { _id: new ObjectId(value.id) },
      {
        $set: {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
        },
      },
    );
    if (!data) {
      throw new Error();
    }
    return data;
  });

  return res.json({
    msg: 'data',
    success: true,
  });
}
