const Game = require('../models/game');

createGame = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a game',
        })
    }

    const game = new Game(body);

    if (!game) {
        return res.status(400).json({ success: false, error: 'Game record is not created' });
    }

    game
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                game: game,
                error: 'Game created!'
            })
        })
        .catch(e => {
            return res.status(422).json({
                errors: e.errors,
                message: 'Game not created'
            })
        });
}

deleteGame = async (req, res) => {
    await Game.deleteOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!game) {
            return res.status(404).json({
                success: false,
                error: 'Game not found'
            });
        }

        return res.status(200).json({
            success: true,
        });
    });
}

updateGame = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No body'
        });
    }
    await Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({
                success: 'No update',
                error: 'Server not ok'
            });
        }

        if (!game) {
            return res.status(404).json({
                error: 'Game not found'
            })
        }

        game.title = body.title;
        game.description = body.description;
        game.rating = body.rating;
        game.platform = body.platform;
        game.releaseDate = body.releaseDate;
        game.developer = body.developer;
        game.genre = body.genre;

        game.save().then(() => {
            return res.status(200).json({
                game,
            });
        }).catch((e) => {
            return res.status(400).json({
                message: 'Game not updated',
                error: e
            });
        })
    });
}

getGames = async (req, res) => {
    const search = req.query.search;

    if (search) {
        await Game.find({
            $or: [
                { title: { '$regex': search, '$options': 'i' } },
                { developer: { '$regex': search, '$options': 'i' } }
            ]
        }, (err, games) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                games: games,
            })
        })
    } else {
        await Game.find({}, (err, games) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                games: games,
            })
        })
    }
}

module.exports = {
    createGame, getGames, deleteGame, updateGame
}