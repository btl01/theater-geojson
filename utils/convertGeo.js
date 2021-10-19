function convertGeo(theater) {
  if (theater.location.address.zipcode === undefined)
    theater.location.address.zipcode = '';
  return {
    type: 'Feature',
    geometry: theater.location.geo,
    properties: { address: theater.location.address },
    _id: theater._id,
  };
}

function revertGeo(location) {
  const coordinates = location.geometry.coordinates;
  const addressProp = location.properties.address;
  if (
    coordinates &&
    coordinates.constructor === Array &&
    coordinates.length == 2 &&
    typeof coordinates[0] === 'number' &&
    typeof coordinates[1] === 'number'
  ) {
    const theater = {
      location: {
        address: { street1: '', city: '', state: '', zipcode: '' },
        geo: { type: 'Point', coordinates: [] },
      },
    };
    theater.location.geo.coordinates = coordinates;
    if (addressProp) {
      theater.location.address = {
        ...theater.location.address,
        ...addressProp,
      };
    }
    return theater;
  } else {
    throw new Error('geometry.coordinates required 2 number');
  }
}

module.exports = { convertGeo, revertGeo };
