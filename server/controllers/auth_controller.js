module.exports = {
    login: (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        
        db.find_user([username]).then( users => {
            if (!users.length) {
                res.status(404).send('User not found');
            } else if (users[0].password !== password) {
                res.status(401).send('Wrong password');
            } else {
                req.session.user = {
                    username: users[0].username,
                    avatar: users[0].avatar
                };
                res.status(200).json(req.session.user);
            }         
        }).catch(err => console.log(err));
    },

    register: (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        db.find_user([username]).then( users => {
            if (users.length) {
                res.status(401).send('User already registered');
            } else {
                db.create_user([username, password]).then( user => {
                    req.session.user = {
                        username: user[0].username,
                        avatar: user[0].avatar
                    };
                    res.status(200).json(req.session.user);
                }).catch(err => console.log(err));
            }         
        }).catch(err => console.log(err));
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json('logged out');
    },

    getUser: (req, res) => {
        res.status(200).json(req.session.user);
    },
}