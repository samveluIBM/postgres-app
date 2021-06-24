const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3050
const db = require('./testqueries')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))


console.log(app.use)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users/', db.getAllUser);
app.get('/bioSidAndroidsubmit/User.aspx?', db.getUser);
app.post('/bioSidAndroidsubmit/Submit.aspx', db.submitUser);




//console.log('Hello Hello Hello')
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

