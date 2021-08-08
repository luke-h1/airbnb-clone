import asyncHandler from 'express-async-handler';
import Property from '../models/propertyModel';
/*
@desc    Fetch all properties
@route   GET /api/properties
@access  Public
*/
const getProperties = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await Property.countDocuments({ ...keyword });
  const properties = await Property.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ properties, page, pages: Math.ceil(count / pageSize) });
});

/*
@desc    Fetch single properties
@route   GET /api/propertiess/:id
@access  Public
*/
const getPropertyById = asyncHandler(async (req, res) => {
  const product = await Property.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

/*
@desc    Delete a property
@route   DELETE /api/property/:id
@access  Private/Admin
*/
const deleteProperty = asyncHandler(async (req, res) => {
  const product = await Property.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

/*
@desc    Create a property
@route   POST /api/properties
@access  Private/Admin
*/
const createProduct = asyncHandler(async (req: any, res) => {
  const product = new Property({
    name: 'Sample name',
    price: 20,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Flat',
    numReviews: 0,
    description: 'Sample description',
    beds: 2,
    bedrooms: 3,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
@desc    Update a property
@route   PUT /api/properties/:id
@access  Private/Admin
*/
const updateProperty = asyncHandler(async (req, res) => {
  const {
    name, price, description, image, beds, bedrooms, category,
  } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    property.name = name;
    property.price = price;
    property.description = description;
    property.image = image;
    property.bedrooms = bedrooms;
    property.category = category;
    property.beds = beds;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

/*
@desc    Create new review
@route   POST /api/properties/:id/reviews
@access  Private
*/
const createPropertyReview = asyncHandler(async (req: any, res) => {
  const { rating, comment } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    const alreadyReviewed = property.reviews.find(
      (r: any) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Property already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    property.reviews.push(review);

    property.numReviews = property.reviews.length;

    property.rating = property.reviews.reduce(
      (acc: number, item: any) => item.rating + acc,
      0,
    ) / property.reviews.length;

    await property.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

/*
@desc    Get top rated properties
@route   GET /api/properties/top
@access  Public
*/
const getTopProperties = asyncHandler(async (_, res) => {
  const products = await Property.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
export {
  getProperties,
  getPropertyById,
  deleteProperty,
  createProduct,
  updateProperty,
  createPropertyReview,
  getTopProperties,
};
