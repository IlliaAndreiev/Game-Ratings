const express = require('express');

const gameCtrl = require('../controllers/game-ctrl.js');
const userCtrl = require('../controllers/user-ctrl.js');
const platformCtrl = require('../controllers/platform-ctrl.js');

const router = express.Router();

router.get('/games', gameCtrl.getGames);
router.post('/games/create', gameCtrl.createGame);
router.put('/games/edit/:id', gameCtrl.updateGame);
router.delete('/games/delete/:id', gameCtrl.deleteGame);

router.post('/login', userCtrl.signIn);
router.post('/sign-up', userCtrl.signUp);

router.get('/platforms', platformCtrl.search);
router.post('/platforms/create', platformCtrl.create);
router.put('/platform/edit/:id', platformCtrl.update);
router.delete('/platform/delete/:id', platformCtrl.remove);

module.exports = router;