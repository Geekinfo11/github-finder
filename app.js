window.onload = () => {
    const darkLightDiv = document.querySelector('.dark-light');
    const logo = document.querySelector('.logo');
    //LIGHT = 0, DARK = 1
    let currentMode = 0;

    darkLightDiv.addEventListener('click', (e) => {
        // make sound effect
        const audio = new Audio("https://geekinfo11.github.io/github-finder/medias/light.switch.wav");
        audio.play();

        if (currentMode == 0) {
            currentMode = 1;
            document.body.style = "background-color:black !important";

            darkLightDiv.children[0].innerHTML = "LIGHT";
            darkLightDiv.children[0].style = "color:#fff";
            darkLightDiv.children[1].classList = "fa-solid fa-sun";
            darkLightDiv.children[1].style = "color:#e3c832 !important";
            logo.style = "color:white !important";
            document.querySelector('.fa-magnifying-glass').style = 'color:#000';
        }
        else {
            currentMode = 0;
            darkLightDiv.children[0].innerHTML = "DARK";
            darkLightDiv.children[0].style = "color:#000";
            darkLightDiv.children[1].classList = "fa-solid fa-moon";
            darkLightDiv.children[1].style = "color:black !important";
            document.body.style = "background-color:#EDEEF5 !important";
            logo.style = "color:#000 !important";
        }
    });

    // hide result section
    const result = document.querySelector('.result');
    result.style = 'display:none';

    // fetch github data
    const searchBttn = document.querySelector('.search');
    const searchInput = document.querySelector('.search-key');
    const avatar = document.querySelector('.avatar');
    const username = document.querySelector('.username');
    const date = document.querySelector('.date');
    const repos = document.querySelector('.repos-nbr');
    const followers = document.querySelector('.followers-nbr');
    const following = document.querySelector('.following-nbr');
    const link = document.querySelector('.link');

    searchInput.addEventListener('keydown', () => {
        result.classList = 'row justify-content-center animate__animated animate__backOutDown';
        setTimeout(() => {
            result.style = 'display:none';
        }, 1000);
    });

    searchBttn.addEventListener('click', () => {
        if (searchInput.value != '') {
            fetch('https://api.github.com/users/' + searchInput.value)
                .then(res => res.json())
                .then(data => {
                    if (data.message != 'Not Found') {
                        avatar.src = data.avatar_url;
                        username.innerHTML = data.login;
                        date.innerHTML = new Date(data.created_at).toUTCString('').split(' ', 4).join(' ');
                        repos.innerHTML = data.public_repos;
                        followers.innerHTML = data.followers;
                        following.innerHTML = data.following;
                        link.innerHTML = data.html_url;
                        link.href = data.html_url;
                        result.classList = 'row justify-content-center animate__animated animate__bounceInUp';
                        result.style = 'display:flex';
                    }
                    else {
                        result.style = 'display:none';
                    }
                });
        }


    });

    // input placeholder animation
    let inputSearch = document.querySelector('.search-key');
    let i = 0;
    let placeholder = '';
    let text = 'Find a Github Account.';
    let speed = 50;

    function type() {
        placeholder += text.charAt(i);
        inputSearch.setAttribute('placeholder', placeholder);
        i++;
        setTimeout(type, 50);
    }

    type();

}