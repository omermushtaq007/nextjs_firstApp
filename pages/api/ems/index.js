// write api code here!
const { connectToDatabase } = require('../../../utils/db');
const ObjectId = require('mongodb').ObjectId;

import { getStaticProps } from '../../index';
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return fetchCustomers(req, res);
    }
    case 'POST': {
      return saveCustomers(req, res);
    }
    case 'PATCH': {
      return findCustomerById(req, res);
    }
    case 'DELETE': {
      return deleteCustomerById(req, res);
    }
  }
}

export async function fetchCustomers(req, res) {
  let { db } = await connectToDatabase();
  let data = await db.collection('ems').find({}).toArray();

  return data;
}

export async function saveCustomers(req, res) {
  let { db } = await connectToDatabase();
  let array = await mapArray();

  let data = await db
    .collection('ems')
    .insertMany(JSON.parse(JSON.stringify(array)))
    .then(console.log)
    .catch(console.error);

  return res.json({
    customers: data,
    success: true,
  });
}

export async function mapArray() {
  let data = await getStaticProps();

  let mapArray = await data.props.customers.map((customer) => customer.node);
  return mapArray;
}

export async function findCustomerById(req, res) {
  let { db } = await connectToDatabase();
  let dataById = await db
    .collection('ems')
    .findOne({ _id: new ObjectId(req.body) })
    .then(console.log)
    .catch(console.error);
  return res.json(dataById);
}

export async function deleteCustomerById(req, res) {
  let { db } = await connectToDatabase();
  let deleted = await db
    .collection('ems')
    .findOneAndDelete({ _id: new ObjectId(req.body) })
    .then(console.log)
    .catch(console.error);

  return res.json(deleted);
}
