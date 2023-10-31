const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
let texts = [];
app.get('/', (req, res) => {
    res.render('intro');
});
app.get('/main', (req, res) => {
    res.render('index', {
        title: 'Blog Posts',
        message: 'Share your thoughts',
        texts: texts
    });
});
app.post('/', (req, res) => {
    const { inputText, category } = req.body;
    texts.push({ text: inputText, category: category });
    switch (category) {
        case 'work':
            res.redirect('/work');
            break;
        case 'home':
            res.redirect('/home');
            break;
        case 'relationships':
            res.redirect('/relationships');
            break;
        default:
            res.redirect('/main');
    }
});
app.get('/work', (req, res) => {
    const workTexts = texts.filter(entry => entry.category === 'work');
    res.render('work', { texts: workTexts });
});
app.get('/home', (req, res) => {
    const homeTexts = texts.filter(entry => entry.category === 'home');
    res.render('home', { texts: homeTexts });
});
app.get('/relationships', (req, res) => {
    const relationshipsTexts = texts.filter(entry => entry.category === 'relationships');
    res.render('relationships', { texts: relationshipsTexts });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
