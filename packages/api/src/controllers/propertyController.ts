import { getConnection } from 'typeorm';
import { validateProperty } from '../validation/property/validateProperty';
import { Property } from '../entities/Property';

const createProperty = async (req, res) => {
  const { options } = req.body;
  const errors = validateProperty(options);
  if (errors) {
    return { errors };
  }

  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Property)
    .values({
      ...options,
      creatorId: req.session.userId,
      image: '',
    })
    .returning('*')
    .execute();
  const property = result.raw[0];
  res.status(201).json({ property });
};

const properties = async (req, res) => {
  const { options } = req.body;
  const { limit, cursor } = options;
  const realLimit = Math.min(50, limit);
  const realLimitPlusOne = realLimit + 1;
  const replacements: any[] = [realLimitPlusOne];

  if (cursor) {
    replacements.push(new Date(parseInt(cursor, 10)));
  }

  const result = await getConnection().query(
    `
      SELECT p.* from "properties" p 
      ${cursor ? 'where p."createdAt" < $2' : ''} 
      ORDER BY p."createdAt" DESC
      LIMIT $1
    `,
    replacements,
  );
  res.status(200).json({
    properties: result.slice(0, realLimit),
    hasMore: result.length === realLimitPlusOne,
  });
};

const property = async (req, res) => {
  const { id } = req.body;
  const singleProperty = await Property.findOne(id);
  res.status(200).json({ singleProperty });
};

const updateProperty = async (req, res) => {
  const { options } = req.body;
  const { id } = req.body;

  const {
    title,
    propertyType,
    description,
    pricePerNight,
    address,
    amenities,
  } = options;
  const result = await getConnection()
    .createQueryBuilder()
    .update(Property)
    .set({
      title,
      propertyType,
      description,
      pricePerNight,
      address,
      image: '',
      amenities,
    })
    .where('id = :id and creatorId = :creatorId', {
      id,
      creatorId: req.session.userId,
    })
    .returning('*')
    .execute();
  const updatedProperty = result.raw[0];
  res.status(204).json({ updatedProperty });
};

const deleteProperty = async (req, res) => {
  const { id } = req.body;
  await Property.delete({ id, creatorId: req.session.userId });
  res.status(204).json({ ok: true });
};

export {
  createProperty, updateProperty, deleteProperty, properties, property,
};
