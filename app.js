const express =require("express");
const app= express();
const path = require("path");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
const userModel = require("./models/user")

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/users", async (req, res) => {
    try {
        let users = await userModel.find();
        console.log(users); 
        res.render("users", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});
app.post("/create",async(req,res)=>{
    try {
        let { name, email, image } = req.body;
        const userCreated = await userModel.create({
            name,
            email,
            image,
        });
        res.redirect("/users")
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get("/delete/:id",async (req,res)=>{
    let user = await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/users");
})
app.get("/edit/:userid",async (req,res)=>{
    let user = await userModel.findOne({_id:req.params.userid})
    res.render("edit",{user})
})
app.post("/update/:userid",async (req,res)=>{
    let {name,email,image} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid}, {name,email,image} ,{new:true})
    res.redirect("/users");
})

app.listen(3000,()=>{
    console.log("App listen on port 3000");
    
})