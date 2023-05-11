const searchResultContainer = document.querySelector('.results');

document.addEventListener('DOMContentLoaded', () => {
    searchUser();
})

function createUserCard(user) {
    return `
    <a href="/user/${user.username}">
        <div class='card-user'>
            <img src= ${user.avatar} />
            <div>
                <span>${user.firstname} ${user.lastname}</span>
                <p>@${user.username}</>
            </div>
        </div>
    </a>
    `
}

function displayUsers(users) {
    searchResultContainer.innerHTML = '';
    users.forEach(user => {
        searchResultContainer.innerHTML += createUserCard(user);
    });
}


function searchUser() {
    const searchInput = document.getElementById('search-input')
    let ref;
    let users;


    searchInput.addEventListener('input', (event) => {
        const term = event.target.value;

        if(ref) {
            clearTimeout(ref);
        }

        if(term.length) {
            ref = setTimeout(() => {
                    axios.get(`/user?search=${term}`)
                        .then(response => {
                            users= response.data;
                            displayUsers(users)
                        })
            }, 500)
        } else {
            searchResultContainer.innerHTML = ''
        }
    })
}