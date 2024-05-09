// dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {userCollection} = require('../config/db')

const saltRounds = 10;

exports.register = async (req, res) => {
    // pass hashing
    const hashPass = await bcrypt.hash(req.body.pass, saltRounds);

    try{
        const user = {
            email : req.body.email,
            pass : hashPass,
        }

        await userCollection.insertOne(user);
        res.status(200).json({
            msg: 'User created',
        });
    }catch (err) {
        res.status(500).json(err);
    }

}

exports.logIn = async (req, res) => {
    try{
        console.log(req.body.email);
        const user = await userCollection.findOne({ email: req.body.email });
        console.log(user);
        if(user){
            const isValid = await bcrypt.compare(req.body.pass, user.pass);
            if (isValid) {
                // token generate
                const { email, _id } = user;
                const jwtObj = {
                    email,
                    id: _id,
                };
                const token = jwt.sign(jwtObj, process.env.JWT_SECRET, { expiresIn: '1hr' });

                res.status(200).json(token);
            } else {
                res.status(401).send('Auth err');
            }

        }else{
            res.status(401).send('Auth err')
        }
    }catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}