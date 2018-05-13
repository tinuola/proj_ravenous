const clientId = process.env.REACT_APP_CLIENTID;
const secret = process.env.REACT_APP_SECRET;
const apiKey = process.env.REACT_APP_APIKEY;

let accessToken;

const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve =>
        resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,{
        method: 'POST',

      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        accessToken = jsonResponse.access_token;
      })
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {

return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
      })
      .then(response => {return response.json(); })
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address,
            city: business.location.city,
            state: business.location.state_code,
            zipCode: business.location.postal_code,
            category: business.categories.title,
            rating: business.rating,
            reviewCount: business.review_count
          }));
        }
      });
    })
  }
};
export default Yelp;
