let container = document.getElementsByClassName("main")[0]; 
let categoriesNode = document.getElementById("categories")


function getParam(url, param) {
    var returnParam = new URL(url).searchParams.get(param);
    return returnParam;
}

fetch("feed.xml")
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let currentPost = getParam(window.location.href, "post");
        let currentCategory = getParam(window.location.href, "category");
        let items = [...data.querySelectorAll("item")]; // get all blog posts

        if(currentPost == null){
            let categories = []
            let categoriesCount = new Map();
            
            items.forEach(el => categories.push(el.querySelector("category").innerHTML));
            
            console.log(categories)
            categories.forEach(function(x) {
                if(!categoriesCount.has(x)){
                    categoriesCount.set(x, 1);
                } else {
                    categoriesCount.set(x, categoriesCount.get(x) +1);
                }
            })

            var sortedcategories = new Map([...categoriesCount.entries()].sort( (a, b) =>{
                if(a[1] < b[1]){
                    return 1;
                }
                if(a[1] > b[1]){
                    return -1
                }
                return 0
            }));

            var categoryText = `Categories: <a href="blog.html"> clear selection</a>, `;
            for (const [key, value] of sortedcategories.entries()) {

                categoryText += ` <a href="blog.html?category=${key}"> ${key} (${value})</a>, `
                console.log(`${key} ${value}`); 
            }
            categoryText = categoryText.substring(0, categoryText.length -2) // remove last comma
            categoriesNode.innerHTML = categoryText;

            
            
            console.log(currentCategory);
            if(currentCategory != null){
                console.log("hi")
                items = items.filter((post) => post.querySelector("category").innerHTML == currentCategory);
            }
        
            let html = ``;
            items.forEach(el =>{
                let date = new Date(el.querySelector("pubDate").innerHTML);
                html += 
                `
                    <div class="blogpost">
                        <h2> ${el.querySelector("title").innerHTML} </h2>
                        <p> Date: ${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}</p>
                        <p> Description: ${el.querySelector("description").innerHTML.substring(0, 250)}...  </p>  
                        <p> Category: <a href= "blog.html?category=${el.querySelector("category").innerHTML}"> ${el.querySelector("category").innerHTML} </a> </p>    
                        <a href="blog.html?post=${el.querySelector("guid").innerHTML}"><button> Read post </button></a>     
                    </div>
                `;
            });

            container.insertAdjacentHTML("beforeend", html);

        } else {
            categoriesNode.innerHTML = ``;
            let post = items.filter((p) => p.querySelector("guid").innerHTML == currentPost)[0]
            console.log(post)
            let date = new Date(post.querySelector("pubDate").innerHTML);
            let html = 
                `
                    <div class="blogpost" style="max-height: 400px;">
                        <h2> ${post.querySelector("title").innerHTML} </h2>
                        <p> Date: ${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}</p>
                        <p> ${post.querySelector("description").innerHTML} </p>  
                        <p> Category: <a href= "blog.html?category=${post.querySelector("category").innerHTML}"> ${post.querySelector("category").innerHTML} </a> </p>  
                        <br>
                    </div>
                    <a href="blog.html"> <p style="text-align: center;"> back </p> </a>

                `
            container.insertAdjacentHTML("beforeend", html);
        }
        
    })


    