const db = require('../models/sleepModels');

const loginControllers = {
  //POST REQUEST for user information on their sleep profile/data
  async createUser (req, res, next) {
    try {
      //returned data
      const values = Object.values(req.body);
      const result = await db.query('INSERT INTO public.user_data(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', values)
      //figure out how to manipulate res from db
      res.locals.users = result.rows; 
      return next();

    }catch (err){
      console.log(err);
      return next(err);
    }
  }
}

module.exports = loginControllers;