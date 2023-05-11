const { newTweet, deleteTweet, displayTweet, updateTweet, showTweet, tweetLike, shareTweet } = require('../controllers/tweet.controller');

const router = require('express').Router();

router.post('/new', newTweet);
router.get('/like/:tweetId', tweetLike)
router.get('/delete/:tweetId', deleteTweet); // supprimer un tweet
router.get('/edit/:tweetId', displayTweet); // affiche le tweet pour la modification
router.post('/edit/:tweetId', updateTweet); // Mise a jour du tweet
router.get('/share/:tweetId', shareTweet);
router.get('/:tweetId', showTweet);

module.exports = router