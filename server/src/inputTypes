const {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
  } = require('graphql'); 
 


    const RentInputType = new GraphQLInputObjectType({
        name: 'RentInput',
        fields: {
            film_id: { type: GraphQLID }, rental_date: { type: GraphQLString }, store_id: { type: GraphQLID },
    }
    });

module.exports  = {
    RentInputType
}