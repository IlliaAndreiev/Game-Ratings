const Platform = require('../models/platform');

create = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a platform',
        })
    }

    const platform = new Platform(body);

    if (!platform) {
        return res.status(400).json({ success: false, error: 'Platform record is not created' });
    }

    platform
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                platform: platform,
                error: 'Platform created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error: error,
                message: 'Platform not created'
            })
        });
}

remove = async (req, res) => {
    await Platform.deleteOne({ _id: req.params.id }, (err, platform) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!platform) {
            return res.status(404).json({
                success: false,
                error: 'Platform not found'
            });
        }

        return res.status(200).json({
            success: true,
        });
    });
}

update = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No body'
        });
    }
    await Platform.findOne({ _id: req.params.id }, (err, platform) => {
        if (err) {
            return res.status(400).json({
                success: 'No update',
                error: 'Server not ok'
            });
        }

        if (!platform) {
            return res.status(404).json({
                error: 'Game not found'
            })
        }

        platform.className = body.className;
        platform.label = body.label;
        platform.value = body.value;

        platform.save().then(() => {
            return res.status(200).json({
                platform,
            });
        }).catch((e) => {
            return res.status(400).json({
                message: 'Platform not updated',
                error: e
            });
        })
    });
}

search = async (req, res) => {
    await Platform.find({}, (err, platforms) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            platforms: platforms,
        })
    })
}


module.exports = {
    search, create, remove, update
}