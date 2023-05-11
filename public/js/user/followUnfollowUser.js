
document.addEventListener('DOMContentLoaded', () => {
    followUnfollowUser()
})


function followUnfollowUser (event) {
    const userProfileContainer = document.querySelector('.user-profile');
    const followBtn = document.querySelector('.btn-primary');
    const unfollowBtn = document.querySelector('.btn-secondary');

    if(followBtn) {
        followBtn.addEventListener('click', function (event) {
            console.log("follow")
            const userid = event.target.dataset.userid;
            axios.get(`/user/follow/${userid}`)
                .then(response => {
                    userProfileContainer.outerHTML = response.data;
                    followUnfollowUser();
                })
        })
    }

    if(unfollowBtn) {
        unfollowBtn.addEventListener('click', function (event) {
            console.log("unfollow")
            const userid = event.target.dataset.userid;
            axios.get(`/user/unfollow/${userid}`)
                .then(response => {
                    userProfileContainer.outerHTML = response.data;
                    followUnfollowUser();
                })
        })
    }
}