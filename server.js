const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session')
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ }));
var temp_result ="";
var temp_section = "";
var temp_year = "";

app.use(session({
    secret: "I am A FUllstack Developer.",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://iete2001:Lxum9WVDzDLTiHa8@cluster0.7ujqs.mongodb.net/iete', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex',true);
const SecondclassSchema = {
    className : String,
    nopaperp : Number,
    nopaperw : Number,
    noprojectd:Number,
    noprojectw : Number,
    nopaperpiit: Number,
    nopaperwiit: Number,
    noprojectdiit: Number,
    noprojectwiit: Number,
    notechp:Number,
    notechw : Number,
    noculp : Number,
    noculw :Number,
    nospop: Number,
    nospow: Number,
    extra:Number,
    Total: Number,
    currentposition:Number,
    previousposition:Number
}
const ThirdclassSchema = {
    className: String,
    nopaperp: Number,
    nopaperw: Number,
    noprojectd: Number,
    noprojectw: Number,
    nopaperpiit: Number,
    nopaperwiit: Number,
    noprojectdiit: Number,
    noprojectwiit: Number,
    notechp: Number,
    notechw: Number,
    noculp: Number,
    noculw: Number,
    nospop: Number,
    nospow: Number,
    extra: Number,
    Total: Number,
    currentposition: Number,
    previousposition: Number
}
const eventSchema = {
    eventName : String,
    eventType : String,
    eventDate : String,
    eventTime : String,
    eventGuest: String,
    eventPresence : String,
    eventPlace :String,
    eventComp : Array
}

const resultSchema = {
    releaseqotta : String,
    eventName : String,
    compName: String,
    compId:String,
    compRes: Array
}

const userSchema = new mongoose.Schema({
    email : String,
    password: String
})




const Secondyear = mongoose.model('Secondyear',SecondclassSchema);
const Thirdyear = mongoose.model('Thirdyear',ThirdclassSchema);
const Event = mongoose.model('Event', eventSchema);
const Result = mongoose.model('Result',resultSchema);
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const thirdyear = new Thirdyear({
    className:"ECE-D",
    nopaperp: 0,
    nopaperw:0,
    nopaperpiit: 0,
    nopaperwiit: 0,
    noprojectd:0,
    noprojectw:0,
    noprojectdiit: 0,
    noprojectwiit: 0,
    notechp:0,
    notechw:0,
    noculp:0,
    noculw:0,
    nospop: 0,
    nospow: 0,
    extra:0,
    Total:0,
    currentposition:0,
    previousposition:0
})

app.get("/", (req, res) => {
    res.sendFile(__dirname  + "index.html")
})
app.get("/sign", (req, res) => {
    res.sendFile(__dirname + "/public/signin.html")
})
app.get("/log", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})
app.get("/logt", (req, res) => {
    res.sendFile(__dirname + "adminverification.html")
})

app.post("/login",(req,res)=>{
    const user = new User({
        username: req.body.username,
        password : req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
            res.redirect("/log")
        }
        else{
            passport.authenticate("local")(req, res, () => {
            res.redirect("/admin");
            });
        }
    })
})

app.get("/signout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})
app.post("/register",(req,res)=>{
    User.register({ username: req.body.username }, req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/sign")
        }
        else{
           passport.authenticate("local")(req,res,()=>{
               res.redirect("/admin");
           })
        }
    })
})


app.get("/points-table",(req,res)=>{
    
    Secondyear.find({},(err,founds)=>{  
        Thirdyear.find({}, (err, found) => {
            res.render("index", { secondArray: founds,thirdArray:found })
        })
    })
    
})

app.get('/admin',(req,res)=>{
    if(req.isAuthenticated()){
        Secondyear.find({}, (err, found) => {
        const max = [];
        found.forEach((item) => {
            max.push(item.Total)
        })
        max.sort(function (a, b) { return b - a })
        found.forEach((item) => {
            if (item.Total === max[0]) {
                item.previousposition = item.currentposition;
                item.currentposition = 1;
            }
            else if (item.Total === max[1]) {
                item.previousposition = item.currentposition;
                item.currentposition = 2;
            }
            else if (item.Total === max[2]) {
                item.previousposition = item.currentposition;
                item.currentposition = 3;
            }
            else if (item.Total === max[3]) {
                item.previousposition = item.currentposition;
                item.currentposition = 4;
            }
            item.Total= item.nopaperp*10 + item.nopaperw*15 + item.noprojectd*15 + item.noprojectw*20;
            item.save()
        })
        Thirdyear.find({}, (err, foundd) => {
            const max = [];
            foundd.forEach((item) => {
                max.push(item.Total)
            })
            max.sort(function (a, b) { return b - a })
            foundd.forEach((item) => {
                if (item.Total === max[0]) {
                    item.previousposition = item.currentposition;
                    item.currentposition = 1;
                }
                else if (item.Total === max[1]) {
                    item.previousposition = item.currentposition;
                    item.currentposition = 2;
                }
                else if (item.Total === max[2]) {
                    item.previousposition = item.currentposition;
                    item.currentposition = 3;
                }
                else if (item.Total === max[3]) {
                    item.previousposition = item.currentposition;
                    item.currentposition = 4;
                }
                item.Total = item.nopaperp * 10 + item.nopaperw * 15 + item.noprojectd * 15 + item.noprojectw * 20;
                item.save()
                
            })
            res.render("admin", { secondArray: found, thirdArray: foundd })
        })
    })
    }
    else{
        res.redirect('/log');
    }
    
})
app.get('/adminAnn', (req, res) => {
    if(req.isAuthenticated()){
          Event.find({}, (err, found) => {
        res.render("adminAnn", {eventArray:found});
}) 
    }
    else{
        res.redirect("/log");
    }
 
})

app.get('/event', (req, res) => {
    Event.find({}, (err, found) => {
        res.render("event", { eventArray: found });
    })
})



app.get("/classper",(req,res)=>{
    if (temp_year ==="Second Year"){
      Secondyear.find({ className:"ECE-"+temp_section},(err,found)=>{
          res.render("classperformance", { requiredArray: found, year:"II"}) 
    })  
    }
    else if (temp_year === "Third Year")
    Thirdyear.find({ className:"ECE-" +temp_section }, (err, found) => {
        res.render("classperformance", { requiredArray: found, year: "III" })
    })
    else{
        res.render("classperformance", { requiredArray: []})
    }
    
})
app.post("/class",(req,res)=>{
    temp_section =req.body.section,
    temp_year = req.body.year,
    res.redirect("/classper")
})



app.post("/addComp",(req,res)=>{
    const compi= {
        name: req.body.comp,
        result : []
    }
    const result = new Result({
        releaseqotta: "NO",
        eventName: req.body.eventName,
        compName: req.body.comp,
        compId : req.body.eventId,
        compRes: [ ]
    })
    result.save();
    Event.findOne({ _id: req.body.UniqueId }, function (err, foundList) {
        foundList.eventComp.push(compi);
        foundList.save();
        res.redirect("/adminAnn");
    });
})
app.post("/event-manager",(req,res)=>{
    const event = new Event({
          eventName : req.body.eventName,
        eventType : req.body.eventType,
        eventDate : req.body.eventDate,
        eventTime : req.body.eventTime,
        eventGuest : req.body.eventGuest,
        eventPresence : req.body.eventPresence,
        eventPlace : req.body.eventPlace,
        eventComp : []
    })
    event.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/adminAnn')
        }
    });
})


// className: String,
//     nopaperp : Number,
//         nopaperw : Number,
//             noprojectd: Number,
//                 noprojectw : Number,
//                     nopaperpiit: Number,
//                         nopaperwiit: Number,
//                             noprojectdiit: Number,
//                                 noprojectwiit: Number,
//                                     notechp: Number,
//                                         notechw : Number,
//                                             noculp : Number,
//                                                 noculw : Number,
//                                                     nospop: Number,
//                                                         nospow: Number,
//                                                             extra: Number,
//                                                                 Total: Number,
//                                                                     currentposition: Number,
//                                                                         previousposition: Number-- >

app.post("/nopaperp",(req,res)=>{
    const id = req.body.UniqueId
    const per = {
        nopaperp : req.body.change
    }
    Secondyear.findByIdAndUpdate(id,per,(err)=>{
       if(err){
           console.log(err);
       }
       else{
           res.redirect('/admin');
       }
    })
})
app.post("/nopaperw", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperw: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectd", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectd: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectw", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectw: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nopaperpiit", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperpiit: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nopaperwiit", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperwiit: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectdiit", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectdiit: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectwiit", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectwiit: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/notechp", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        notechp: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/notechw", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        notechw: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noculp", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noculp: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noculw", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noculw: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nospop", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nospop: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nospow", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nospow: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/extra", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        extra: req.body.change
    }
    Secondyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})






app.post("/nopaperpt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperp: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nopaperwt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperw: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectdt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectd: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectwt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectw: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nopaperpiitt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperpiit: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nopaperwiitt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nopaperwiit: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectdiitt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectdiit: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noprojectwiitt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noprojectwiit: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/notechpt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        notechp: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/notechwt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        notechw: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noculpt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noculp: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/noculwt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        noculw: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nospopt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nospop: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/nospowt", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        nospow: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.post("/extrat", (req, res) => {
    const id = req.body.UniqueId
    const per = {
        extra: req.body.change
    }
    Thirdyear.findByIdAndUpdate(id, per, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin');
        }
    })
})
app.get("/admin-event", (req, res) => {
    if(req.isAuthenticated()){
       Event.find({ }, (err, found) => {
        if(found.length===0){
            res.sendFile(__dirname + "/public/noinfo.html")
        
        }
        else{
            found.forEach((founds) => {
                res.render("adminEvent", {
                    adminEventArray: found,
                    needed: temp_result,
                    extra: founds.eventComp,
                    foun: founds._id,
                    name: founds.eventName
                })
            })
        }
        }) 
    }
    else{
        res.redirect("/log");
    } 
})
app.post("/result-manager",(req,res)=>{
    temp_result = req.body.eventType ;
    res.redirect("/admin-event")
})
// years: 'Year',
//     yearse: 'Section',
//         compName: 'PAPER',
//             indexName: '0',
//                 sname: '',
//                     stopic: '',
//                         UniqueId
app.post("/result-m", (req, res) => {
    const per = {
        Year : req.body.years,
        Section : req.body.yearse,
        StudentName : req.body.sname,
        Topic : req.body.stopic
    }
    Result.findOne({ compName: req.body.compName }, function (err, foundList) {
        foundList.compRes.push(per);
        foundList.save();
        res.redirect("/admin-event");
    });
})

app.post("/result-publish",(req,res)=>{
    const id =req.body.compName; 
    const per = {releaseqotta :req.body.change}
      Result.findByIdAndUpdate(id,per, function (err, foundList) {
        res.redirect("/results")
      })
    
})
app.get("/results",(req,res)=>{
      Result.find({},(err,fouund)=>{
        res.render("results",{neededArray : fouund})
    })  
    
})
app.get("/results-user", (req, res) => {
    var cd="";
    Result.find({}, (err, fouund) => {
        fouund.forEach(found=>{
            cd = found
        })
        res.render("result-user", { neededArray: fouund, eventName:cd.eventName }) 
    })
})



app.post('/del-comp',(req,res)=>{
    Event.findOne({ _id: req.body.compi }, function (err, foundList) {
        foundList.eventComp = foundList.eventComp.filter(item => item.name !== req.body.UniqueId)
        foundList.save();
    });
    Result.deleteOne({ compName: req.body.UniqueId, compId: req.body.compi }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/adminAnn");
        }
    })
})
app.post("/delete-event",(req,res)=>{
    const UniqueId = req.body.UniqueId;
    Event.deleteOne({ _id: UniqueId }, function (err) {
        if(err){
            console.log(err);
        }
        else{
         Result.deleteMany({  compId: req.body.UniqueId }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/adminAnn");
        }
    })   
        }
        
    })
    
    

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("Server started on port");
});