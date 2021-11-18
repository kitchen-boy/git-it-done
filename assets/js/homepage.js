var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
   
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);


        nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }

    console.log(event);
};


var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // be sure to not add quotes to user parameter into the GitHub API URL
    // this is the variable to make the getUserRepos function dynamic, i.e., to request any user's repos

    // make a get request to the url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        console.log(response);    
        response.json().then(function(data) {
            console.log(data);
            displayRepos(data, user);
        });
    });
};


var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);