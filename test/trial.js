function makeCategoriesArray() {
  return  [ 
    { 
      id: 1,
      category_name: 'cat1'
    },
    { 
      id: 2,
      category_name: 'cat2'
    },
    { 
      id: 3,
      category_name: 'cat3'
    }
  ]
}

function makePlaceCategoriesArray() {
  return [
    { 
      place_id: 1,
      category_id: 1
    },
    {
      place_id: 1,
      category_id: 2
    },
    { 
      place_id: 2,
      category_id: 2
    },
    { 
      place_id: 3,
      category_id: 3 
    }
  ]
}

const testCats = makeCategoriesArray()
const testPlaceCats = makePlaceCategoriesArray()
const placeCategs = testPlaceCats.filter(placecat => placecat.place_id === 1)
const categoryNames = placeCategs.map(placeCateg => 
  testCats.filter(category => category.id === placeCateg.category_id)
  .map(cat => cat.category_name))
  .reduce((acc, val) => acc.concat(val), [])

