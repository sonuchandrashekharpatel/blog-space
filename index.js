
let postsArray = []

const blogList = document.getElementById("blog-list")
const postTitle = document.getElementById("post-title")
const postBody = document.getElementById("post-body")
const form = document.getElementById("form")

function renderPosts() {
    let postHtml = ''
    for( let post of postsArray) {
        postHtml += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>

            <hr />
        `
    }
    // postTitle.value = ""
    // postBody.value = ""

    form.reset()
    blogList.innerHTML = postHtml
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then( res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()

    })

form.addEventListener("submit", (e) => {

    e.preventDefault();
    const data = { 
        title : postTitle.value,
        body: postBody.value
    }

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(res => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()
    })
})
