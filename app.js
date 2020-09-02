// 1.載入express模組
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// 7.引入JSON檔
const store_list = require('./restaurant.json')

// 2.定義port
const port = 3000

// 5.設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 6.設定靜態檔案位置
app.use(express.static('public'))


// 3.設定路由
// 根目錄
app.get('/', function(req, res) {
    // res.send(`This is a restaurant page`)
    res.render('index', { stores: store_list.results })
})

// 餐廳頁面
app.get('/restaurants/:store_id', function(req, res) {
    // 使用find()
    const store_selected = store_list.results.find(store => store.id === parseInt(req.params.store_id))

    res.render('show', { store: store_selected })
        // 使用filter()
        /*
        console.log(typeof req.params.store_id)
        const store_selected = store_list.results.filter(function(store) {
            return store.id == req.params.store_id
        })
        res.render('show', { store: store_selected[0] })
        */
})

// 搜尋頁面
app.get('/search', function(req, res) {
    const store_search = store_list.results.filter(function(store) {
        return store.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    if (store_search.length > 0) {
        res.render('index', { stores: store_search, keyin: req.query.keyword })
    } else {
        res.render('none', { keyin: req.query.keyword })
    }

})

// 4.啟動伺服器
app.listen(port, function() {
    console.log(`Express is activiated on http://localhost:${port}`)
})