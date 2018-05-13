const apiKey = process.env.REACT_APP_APIKEY;

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json(); 
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address,
          city: business.location.city,
          state: business.location.state_code,
          zipCode: business.location.zip_code,
          category: business.categories.title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
