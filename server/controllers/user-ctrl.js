const bcrypt = require('bcryptjs');

const User = require('../models/User');

signUp = (req, res) => {
    
    const body= req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Fields are required',
        })
    }

    const user = new User({
        username: body.username,
        password: body.userpassword
    });

    if (!user) {
        return res.status(400).json({ success: false, error: 'User is not created' });
    }

    user
        .save()
        .then(() => {
            const token = '7be2d2d20c106eee0836c9bc2b939890a78e8fb3';

            return res.status(201).json({
                user,
                token
            })
        })
        .catch(error => {
            return res.status(400).json({
                error: error,
                message: 'User not created'
            })
        });
}

// getBlogByID = async (req, res) => {
//     await Blog.findOne({ _id: req.params.id }, (err, blog) => {
//         if (err) {
//             return res.status(400).json({
//                 success: 'My Name Is Illia',
//                 error: 'Server error'
//             });
//         }

//         return res.status(200).json({
//             success: 'Server is ok',
//             data: blog
//         });
//     });
// }

signIn = async (req, res) => {
    console.log('asd');
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send("Email is not found");

    const token = '7be2d2d20c106eee0836c9bc2b939890a78e8fb3';
    // const validPass = await bcrypt.compare(req.body.userpassword, user.userpassword);
    // if(!validPass) return res.status(400).send("Invalid password");

    res.status(200).json({
        token,
        user
    });
    // if (username.length > 0 && userpassword.length > 0) {
    //     data = {
    //         username: username,
    //         userpassword: userpassword
    //     };
    // }
    // else {
    //     res.json({
    //         status: 0,
    //         message: err
    //     });
    // }

    // User.findOne(data, function(err, user) {
    //     if (err) {
    //         res.json({
    //             status: 0,
    //             message: err
    //         });
    //     }
    //     if (!user) {
    //         res.json({
    //             status: 0,
    //             msg: "not found"
    //         });
    //     }
    //     res.json({
    //         status: 1,
    //         id: user._id,
    //         message: " success"
    //     });
    // });
}

module.exports = {
    signUp, signIn
}
