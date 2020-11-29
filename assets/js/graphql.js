let request = {
    query: `query {
  viewer {
    login
    avatarUrl
    bio
    email
    repositories(privacy: PUBLIC, last: 20) {
      edges {
        node {
          id
          forkCount
          name
          primaryLanguage {
            color
            name
          }
          stargazerCount
          url
          updatedAt
          descriptionHTML
        }
      }
    }
    twitterUsername
    url
    name
    websiteUrl
    location
    status {
      message
      emojiHTML
    }
    following {
      totalCount
    }
    followers {
      totalCount
    }
    starredRepositories {
      totalCount
    }
  }
}
`
}

let url = 'https://api.github.com/graphql'
let body = JSON.stringify(request)

let token = process.env.TOKEN
let options = {
    method: "POST",
    headers: {
        Authorization: `bearer ${token}`
    },
    body
}
let apiRes = null

function fetchData() {
    fetch(url, options)
        .then(response => response.json())
        .then(res => {
            let { data } = res
            apiRes = data.viewer
            assignProfileData()
        })
}

function assignProfileData() {
    let repos = apiRes.repositories.edges
    let userImage = document.querySelectorAll('.user__avatar')
    let username = document.querySelectorAll('.username')
    let fullName = document.querySelector('.profile__name')
    let statusMessage = document.querySelector('#statusMessage')
    let statusIcon = document.querySelectorAll('.status__icon')
    let profileBio = document.querySelector(".profile__bio")
    let location = document.querySelector('#location')
    let email = document.querySelector('#email')
    let profileUrl = document.querySelector('#profileUrl')
    let twitter = document.querySelector('#twitter')
    let repoCount = document.querySelector('.repo__number')
    let followers = document.querySelector('#followers')
    let following = document.querySelector('#following')
    let starCount = document.querySelector('#starCount')
    assignRepoData(repos)
    userImage.forEach(img => {
        img.src = apiRes.avatarUrl
    });
    username.forEach(elem => {
        elem.innerHTML = apiRes.login
    });

    fullName.innerHTML = apiRes.name

    statusMessage.innerHTML = apiRes.status.message

    statusIcon.forEach(icon => {
        icon.innerHTML = apiRes.status.emojiHTML
    });

    profileBio.innerHTML = apiRes.bio
    location.innerHTML = apiRes.location
    email.innerHTML = apiRes.email
    profileUrl.innerHTML = apiRes.websiteUrl
    profileUrl.href = apiRes.websiteUrl
    twitter.href = `https://twitter.com/${apiRes.twitterUsername}`
    twitter.innerHTML = `@${apiRes.twitterUsername}`
    followers.innerHTML = apiRes.followers.totalCount
    following.innerHTML = apiRes.following.totalCount
    repoCount.innerHTML = apiRes.repositories.edges.length
    starCount.innerHTML = apiRes.starredRepositories.totalCount
}

function assignRepoData(repos) {
    let repoContainer = document.querySelector('#repoContainer')
    repos.forEach(repo => {
                let repoLink = repo.node.url
                let repoTitle = repo.node.name
                let repoUpdatedDate = repo.node.updatedAt
                let repoDescription = new DOMParser().parseFromString(repo.node.descriptionHTML, 'text/html').body.firstChild.innerHTML
                let forkCount = repo.node.forkCount
                let repoLangColor = repo.node.primaryLanguage ? repo.node.primaryLanguage.color : null
                let repoLang = repo.node.primaryLanguage ? repo.node.primaryLanguage.name : null
                let repoDiv = `
                  <li class="repo">
                    <div class="repo-info__div">
                      <h1 class="repo-info__title">
                        <a href="${repoLink}"> ${repoTitle} </a>
                      </h1>
                      <p class="repo-info__description">${repoDescription}</p>
                      <div class="repo-info__extras">
                        ${repoLangColor ? `<span class="repo-lang-color__div" style="background-color: ${repoLangColor};"></span>` : ""}
                        ${repoLang ? `<p class='repo-info__text'>${repoLang}</p>`: ""}
                        ${forkCount > 0 ? `<p class='repo-info__text'><i class="ri-git-branch-line"></i>${forkCount}</p>` : ''}
                        <p class="repo-updated__text">
                          Updated on ${new Date( repoUpdatedDate ).getDate()} ${new Date( repoUpdatedDate ).toLocaleString( 'default', { month: 'short' } )}
                        </p>
                      </div>
                    </div>
                    <button class="repo-star__button">
                      <i class="far fa-star"></i>
                      Star
                    </button>
                  </li>
        `
        repoContainer.innerHTML += repoDiv
    });
}

fetchData()