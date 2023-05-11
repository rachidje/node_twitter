const { newComment } = require('../controllers/comment.controller');

const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.end()
})
router.post('/new/:tweetId', newComment);

module.exports = router;