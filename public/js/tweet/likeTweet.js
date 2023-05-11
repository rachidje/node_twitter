document.addEventListener('DOMContentLoaded', () => {
    likeTweet();
})

function likeTweet() {
    const allHearts = document.querySelectorAll('.fa-heart');
    
    allHearts.forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopImmediatePropagation();
            const tweetid = event.target.dataset.id;
            const tweetContainer = event.target.parentNode.parentNode.parentNode.parentNode;
            
            axios.get(`/tweet/like/${tweetid}`)
                .then(response => {
                    tweetContainer.outerHTML = response.data;
                    likeTweet()
                })
        })
    })
}