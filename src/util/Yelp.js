const apiKey = 'K84Nk2Q5OwmSoNaemQyr8yao-c4-ipljcFluqY3CYtML7VtwkOb7-ovdBYyabSv8McniHv17IdZxgo5xEWJYlZMoUrivAWKGpfuCjQtCjB6O-hOtIS5IlANZe6c7XHYx'

const Yelp = {
    search: function(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {headers: {
                Authorization: `Bearer ${apiKey}`
            }}
        ).then(response => response.json()).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                })
            } else {
                return []
            }
        })
    }
}

export default Yelp