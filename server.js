require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// import Blog from './models/Blog';
const Blog = require("./models/Blog")
const Login = require("./models/Login")
const mongoose = require('mongoose');
const link = process.env.MONGODB_URI

async function connectDB() { 
    try {
        await mongoose.connect(link);
        console.log("Yeah!!!");
    } catch (error) {
        console.error(error);
    }
}
connectDB()


const article = new Blog({
    title: '',
    slug: '',
    published: true,
    author: 'Hark Horning',
    content: '',
    contentTwo: '',
    contentThree: '',
    contentFour: '',
    createdAt: Date.now(),
    editedAt: Date.now()
})
// article.save();

const createUser = new Login({
    username: 'temporary wizard',
    password: 'password?123?',
})
// createUser.save();


//end of mongoose stuff

//root public
app.use(express.static(path.join(__dirname, '/public')));


app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    const posts = await Blog.find();
    res.render('home.ejs', {
        posts
    });
})

app.get('/search', async (req, res) => {
    const searched = req.query.searched;
    const unfilteredPosts = await Blog.find();
    const posts = unfilteredPosts.filter(post => post.title.toLocaleLowerCase().includes(searched.toLocaleLowerCase()));
    res.render('home.ejs', {
        posts
    });
})

//single post

app.get('/post/:id', async (req, res) => {
    let slug = req.params.id;
    const data = await Blog.findById( { _id: slug } );
    res.render('post.ejs', {
        data
    })

})

//login
// app.get('/loginTemp', async (req, res) => {
//     res.render('loginTemp.ejs', {
//     });
// })

// app.get('/login', async (req, res) => {
//     const userName = req.query.userName;
//     const password = req.query.password;
//     const loginInfo = await Login.find();

//     if (userName === loginInfo[0].username && password === loginInfo[0].password) {
//         res.redirect('/workshop')
//     } else {
//         res.render('/')
//     }
// })




// workshop
app.get('/workshop', async (req, res) => {
    res.render('workshop.ejs', {

    })
})

//create post

// app.get('/create', async (req, res) => {
//     const theTitle = req.query.title;
//     const theContent = req.query.content;
//     console.log(theContent);
//     const newPost = new Blog({
//         title: theTitle,
//         slug: 'In this post...',
//         published: true,
//         content: theContent,
//     })
//     newPost.save();
//     res.render('/')
// })

//listening on port
app.listen(port, () => {
    console.log(`listening on port:${port}`);
})