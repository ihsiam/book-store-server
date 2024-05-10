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
        const userObj = {
            user: req.body.user,
            img: req.body.img,
            email : req.body.email,
            pass : hashPass,
        }

        await userCollection.insertOne(userObj);
        res.status(200).json({
            msg: 'User created',
        });
    }catch (err) {
        res.status(500).json(err);
    }

}

exports.logIn = async (req, res) => {
    try{
        const userInfo = await userCollection.findOne({ email: req.body.email });

        if(userInfo){
            const isValid = await bcrypt.compare(req.body.pass, userInfo.pass);
            if (isValid) {
                // token generate
                const { user, img, email, _id } = userInfo;
                const jwtObj = {
                    user,
                    img,
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