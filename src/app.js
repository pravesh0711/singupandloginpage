const express = require('express');
const app = express();
const path = require('path');
const empcoll = require('./model/model');
const empcollection = require('./model/model');
const temp_path = path.join(__dirname,"../template/views")
app.set('view engine', 'hbs');
app.set('views', temp_path);

require('./db/db')
const port = 3000;

app.use(express.urlencoded({extended:false}));
// app.get('/',(req,res)=>{
//     res.send('ram ram');
// })
app.get('/',(req,res)=>{
    res.render('singup');
})

app.post('/empData', async (req,res)=>{
    // console.log(req.body.name);
    // res.send(req.body.name);

  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(password === cpassword){
        const empd = new empcoll({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            cpassword: req.body.cpassword
        });
        const postData = await empd.save();
        res.send(postData);
    }
    else{
        res.send("Password is not Same....");
    }
    
  } catch (error) {
        res.send("Password is not Match....");
  }
})


app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/loginPage', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.loginpassword;
    const getemail = await empcoll.findOne({email : email});
    // console.log(getemail.password);
    // res.send(getemail.password);
    if(getemail.password === password){
        res.render('Home');
    }else{
        res.send("Password or Email are not found");
    }
    

})
app.listen(port,()=>{
    console.log("listing Bro");
})
