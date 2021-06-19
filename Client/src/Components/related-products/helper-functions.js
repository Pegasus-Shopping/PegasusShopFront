// input: type: object, array, content: product details format of api respective api data,
// styles array (style.results)
// output: a string of the display price of a product
// side effects: none
const getTruePrice = (details, styles) => {
  const salePrice = styles[0].sale_price;
  const originalPrice = styles[0].original_price;
  const defaultPrice = details.default_price;
  let displayPrice = null;
  if (salePrice) {
    displayPrice = salePrice;
  } else if (originalPrice) {
    displayPrice = originalPrice;
  } else {
    displayPrice = defaultPrice;
  }
  return displayPrice;
};
export default {
  // input: type: objects, content: representations of a product that have a features property
  // output: type: array of objects,
  // each item in the array has the format :
  // {
  //   feature: /*feature name */,
  //   current: /*feature value of displayed product */,
  //   compare: /*feature value of product being compared */,
  // },
  // side effects: none
  createFeatureArray: (currentProduct, compareProduct) => {
    const currentFeatures = currentProduct.features;
    const compareFeatures = compareProduct.features;
    const compareFeaturesMap = {};
    const currentFeaturesMap = {};
    const result = [];
    if (currentFeatures) {
      currentFeatures.forEach((feature) => {
        currentFeaturesMap[feature.feature] = feature.value;
      });
    }

    if (compareFeatures) {
      compareFeatures.forEach((feature) => {
        compareFeaturesMap[feature.feature] = feature.value;
      });
    }
    Object.keys(currentFeaturesMap).forEach((key) => {
      result.push(
        {
          feature: key,
          current: currentFeaturesMap[key],
          compare: compareFeaturesMap[key],
        },
      );
    });
    Object.keys(compareFeaturesMap).forEach((key) => {
      if (!currentFeaturesMap[key]) {
        result.push({
          feature: key,
          current: currentFeaturesMap[key],
          compare: compareFeaturesMap[key],
        });
      }
    });
    return result;
  },
  getTruePrice,
  removeFromOutfit: (product) => {
    window.localStorage.removeItem(product.id.toString());
  },
  // input: type: number, contentL id of product to be added to local storage
  // output: none
  // side effects: adds id to local storage
  addToOutfit: (id) => {
    window.localStorage.setItem(id, id);
  },
  // input: none
  // output: type: array of numbers, content: each number is an id for a product in the outfit list
  // side effects: none
  getOutfit: () => {
    const outfitArray = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      outfitArray.push(Number(localStorage.getItem(localStorage.key(i))));
    }
    return outfitArray;
  },
  // input: object properties from a request to /all
  // output: object with shape:
  // {
  //   name:,
  //   id:,
  //   category:,
  //   truePrice:,
  //   ratings,
  //   imgUrl,
  // }
  // side effect: none
  formatProduct: (stylesReturn, ratingReturn, productReturn) => {
    const newProduct = { id: productReturn.id, ratings: [] };
    newProduct.name = productReturn.name;
    newProduct.category = productReturn.category;
    ratingReturn.results.forEach((review) => {
      newProduct.ratings.push(review.rating);
    });
    newProduct.imgUrl = stylesReturn.results[0].photos[0].thumbnail_url;
    newProduct.truePrice = getTruePrice(productReturn, stylesReturn.results);
    return newProduct;
  },
};
