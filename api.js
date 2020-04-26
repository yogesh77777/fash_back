// const express=require('express');
// const cors=require('cors');
// const bodyParser=require('body-parser');
// const sha1=require('sha1');
// const mongoose=require('mongoose');


// //for uploading
// const multer=require('multer');
// const path="./attach";
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,path)
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//     }
//   })
  
//   let upload = multer({ storage: storage }).single('Image');


// //connect mongoose to mongodb 
// mongoose.connect("mongodb://localhost/myproo", {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   });
// let adminLogin=require('./database/adminlogin');
// let catModel=require('./database/category');

// let app=express();
// app.use(cors());
// app.use(bodyParser.json());
// //login
// app.post('/api/adminlogin',function(req,res)
// {
//     let email=req.body.email;
//     let password=sha1(req.body.password);
//     //for insert data 
//     let ins=new adminLogin({'email':email,'password':password});
//     // ins.save(function(err)
//     // {
//     //     if(err){}
//     //     else
//     //     {
//     //         res.json({'msg':'Data Save'})
//     //     }
//     // })

// adminLogin.find({'email':email,'password':password},function(err,data)
//     {
//        if(err)
//        {
//         res.json({'err':'1','msg':'wrong email and password'})
//        }
//        else if(data.length==0)
//        {
//            res.json({'err':'1','msg':'Email or password is not correct'})
//        }
//        else
//        {
//            res.json({'err':0,'msg':'login succes','user':email});
//        }
//     })


// app.post('/api/addCategory',function(req,res)
// {
//    upload(req,res,function(err)
//    {
//        if(err){}
//        else
//        {
//            let cname=req.body.cname;
//            let description=req.body.description;
//            let imgname=req.file.filename;
//            let ins=new catModel({'cname':cname,'description':description,'image':imgname});
//            ins.save(function(err)
//            {
//                if(err){}
//                else
//                {
//                    res.json({'err':0,'msg':'category Saved'})
//                }
//            })
//        }
//    })
// })



// })
// app.listen(7788,function()
// {

const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sha1=require('sha1');

//for sending email
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yogeshchandwani123@gmail.com',
    pass: 'yogi@123'
  }
});
//for uploading
const multer=require('multer');
const path="./attach";


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
  
  let upload = multer({ storage: storage }).single('Image');
const mongoose=require('mongoose');
//connect mongoose to mongodb 
mongoose.connect("mongodb+srv://mongoDBuser:Yogi@1998@cluster0-fzsr2.mongodb.net/test?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useUnifiedTopology:true,
    useNewUrlParser: true
  });
let adminLogin=require('./database/adminlogin');
let catModel=require('./database/category');
let proModel=require('./database/product');
let feedModel=require('./database/myfeedback');
let cartModel=require('./database/mycart');
let userModel=require('./database/myuser');
let orderModel=require('./database/myorder');

let app=express();
app.use('/images',express.static('attach'));
app.use(cors());
app.use(bodyParser.json());
//login
app.post('/api/adminlogin',function(req,res)
{
    let email=req.body.email;
    let password=sha1(req.body.password);
   // for insert data 
    // let ins=new adminLogin({'email':email,'password':password});
    // ins.save(function(err)
    // {
    //     if(err){}
    //     else
    //     {
    //         res.json({'msg':'Data Save'})
    //     }
    // })
    adminLogin.find({'email':email,'password':password},function(err,data)
    {
       if(err){}
       else if(data.length==0)
       {
           res.json({'err':1,'msg':'Email or password is not correct'})
       }
       else
       {
           res.json({'err':0,'msg':'login succes','user':email});
       }
    })

})
//addcategory 
app.post('/api/addCategory',function(req,res)
{
   upload(req,res,function(err)
   {
       if(err){}
       else
       {   let g=req.body.gender;
        console.log(g);
           let cname=req.body.cname;
           let description=req.body.description;
           let imgname=req.file.filename;
           let ins=new catModel({'cname':cname,'description':description,'image':imgname,'gender':g});
           ins.save(function(err)
           {
               if(err){}
               else
               {
                   res.json({'err':0,'msg':'category Saved'})
               }
           })
       }
   })
})


//fetc api
app.get('/api/getCategory',function(req,res)
{
  catModel.find({},function(err,data)
  {
    if(err)
    {
      res.json({'err':1,'msg':'some error'})
    }
    else
    {
      res.json({'err':0,'cdata':data})
    }

  })

})
//get category in front for  females
app.get('/api/getCategoryfrontfemales',function(req,res)
{
  catModel.find({'gender':"Female"},function(err,data)
  {
    if(err)
    {
      res.json({'err':1,'msg':'some error'})
    }
    else
    {
      res.json({'err':0,'cdata':data})
    }

  })

})

//get category in front for males
app.get('/api/getCategoryfrontmales',function(req,res)
{
  catModel.find({'gender':"Male"},function(err,data)
  {
    if(err)
    {
      res.json({'err':1,'msg':'some error'})
    }
    else
    {
      res.json({'err':0,'pdata':data})
    }

  })

})

//delcat
// app.get('/api/delcat/:id',function(req,res)
// {   
//     let catid=req.params.id;
//     catModel.remove({'_id':catid},function(err)
//     {
//         if(err){}
//         else
//         {
//             res.json({'err':0,'msg':'category deleted'});
//         }
//     })
// })

app.get('/api/delcat/:id',function(req,res)
{
    let catid=req.params.id;

    catModel.find({'_id':catid},function(err,data){
      if (err){}
        else{
        let  category=data[0].cname;
          //console.log(category);
     proModel.remove({'category':category},function(err){
          if (err){
          }
            else{
              console.log("product deleted");
            }
        })
   }
 })
   
        catModel.remove({'_id':catid},function(err)
    {
        if(err){}
        else
        {
          res.json({'err':0,'msg':'category deleted'});
        }
    })
      })


//fetch cat by id 
app.get('/api/fetchcatbyid/:id',function(req,res)
{
    let cid=req.params.id;
    catModel.find({'_id':cid},function(err,data)
    {
        if(err){}
        else{
            res.json({'err':0,'cdata':data});
        }
    })
})
// changepassword
app.post('/api/changepassword/:id',function(req,res)
{
    let cid=req.params.id;
    let op=sha1(req.body.oldpassword)
    let np=sha1(req.body.newpassword)
     adminLogin.find({'email':cid},function(err,data)
     {
      if(err){}
        else
        {
          let dbpass=data[0].password;
          if(op==dbpass){
           adminLogin.update({'email':cid},{$set:{'password':np}},function(err)   
    {
        if(err)
        {}
        else{
            res.json({'err':0,'msg':'password changed'});
        }
    })
         }
         else
         {
          res.json({'err':1,'msg':'old password is incorrect'});
         }
        }
     })
 })
//editcategory api
app.post('/api/editcategory/:id',function(req,res)
{
  upload(req,res,function(err)
  {
    if(err)
    {}
    else{
let cid=req.params.id;
let name=req.body.cname;
let desc=req.body.description;
let imgname=req.file.filename;

    catModel.find({'_id':cid},function(err,data){
            if(err){}
              else{
                let cat=data[0].cname;
                proModel.updateMany({'category':cat},{$set:{'category':name}},function(err){
                  if (err){}
                    else{
                      console.log("product category changed");
                    }
                })
              }
           })

 catModel.update({'_id':cid},{$set:{'cname':name,'description':desc,'image':imgname,'created_at':Date.now()}},function(err)
 {

if(err){
   res.json({'err':1,'msg':'category not edited'})
}
  else
  {
    res.json({'err':0,'msg':'category edited'})
  }
  })
     }
})
})


//add products
app.post('/api/addproduct',function(req,res)
{
   upload(req,res,function(err)
   {
       if(err){}
       else
       {
           let pname=req.body.pname;
           let description=req.body.description;
           //let imgname=req.file.filename;
            let imgname=req.file.filename;
           let brand=req.body.brand;
           let price=req.body.price;
           let cat=req.body.category;
          
let ins=new proModel({'pname':pname,'description':description,'image':imgname,'brand':brand,'price':price,'category':cat});
           ins.save(function(err)
           {
               if(err){
                res.json({'err':1,'msg':'product not Saved'})
               }
               else
               {
                   res.json({'err':0,'msg':'product Saved'})
               }
           })
       }
   })
})

//getproduct
app.get('/api/getproduct',function(req,res)
{
  proModel.find({},function(err,data)
  {
    if(err)
    {
      res.json({'err':1,'msg':'some error'})
    }
    else
    {
      res.json({'err':0,'pdata':data})
    }

  })

})


//delpro
app.get('/api/delpro/:id',function(req,res)
{
    let proid=req.params.id;
    proModel.remove({'_id':proid},function(err)
    {
        if(err){}
        else
        {
            res.json({'err':0,'msg':'product deleted'});
        }
    })
})


//fetchprobyid
app.get('/api/fetchprobyid/:id',function(req,res)
{
    let pid=req.params.id;
    proModel.find({'_id':pid},function(err,data)
    {
        if(err){}
        else{
            res.json({'err':0,'pdata':data});
        }
    })
})




//editproduct

app.post('/api/editproduct/:id',function(req,res)
{
  upload(req,res,function(err)
  {
    if(err)
    {}
    else{
let pid=req.params.id;
let name=req.body.pname;
let desc=req.body.description;
let imgname=req.file.filename;
let brand=req.body.brand;
let price=req.body.price;
 proModel.update({'_id':pid},{$set:{'pname':name,'description':desc,'image':imgname,'brand':brand,'price':price,'created_at':Date.now()}},function(err)
 {

if(err){
   res.json({'err':1,'msg':'product not edited'})
}
  else
  {
    res.json({'err':0,'msg':'product edited'})
  }

 })
}

})
})

//filter by category api 
app.get('/api/getfilter/:d',function(req,res)
{
    let cat=req.params.d;
    proModel.find({'category':cat},function(err,data)
    {
        if(err){}
        else{
            res.json({'err':0,'pdata':data});
        }
    })
})



app.listen(8000,function()
{
    console.log("Work on 8000");
})

//feedaback
app.post('/api/feedback',function(req,res)
{
  let name=req.body.name;
  let email=req.body.email;
  let subject=req.body.subject;
  let message=req.body.message;


let ins=new feedModel({'name':name,'email':email,'subject':subject,'message':message});
    ins.save(function(err)
    {
        if(err){}
        else
        {   
            var mailOptions = {
  from: 'yogeshchandwani123@gmail.com',
  to: 'yogesh.chandwani_cs17@gla.ac.in',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
            res.json({'err':0,'msg':'feedback send successfully'})
        }
    })

})


//get prducts in front
app.get('/api/getproduct/:cn',function(req,res)
{
    let cn=req.params.cn;
    proModel.find({'category':cn},function(err,data)
    {
        if(err){}
        else{
            res.json({'err':0,'pdata':data});
        }
    })
})


// get product details
app.get('/api/getproductdetails/:pn',function(req,res)
{
    let pn=req.params.pn;
    proModel.find({'pname':pn},function(err,data)
    {
        if(err){}
        else{
            res.json({'err':0,'pdata':data});
        }
    })
})


//add to cart
app.post('/api/addtocart/:pn/:uid',function(req,res)
{
  let pn=req.params.pn;
 //let pname=req.body.pname;
  //let price=req.body.price;
  let qty=req.body.qty;
  ///let brand=req.body.brand;
  let size=req.body.size;
  let color=req.body.color;
  let email=req.params.uid;

   proModel.find({'pname':pn},function(err,data)
    {
        if(err){}
        else{
            let pname=data[0].pname;
            let price=data[0].price;
            let brand=data[0].brand;
            let total=qty*price;
            let gtotal;
            

      let ins=new cartModel({'pname':pname,'email':email,'price':price,'qty':qty,'brand':brand,'color':color,
        'size':size,'total':total});
    ins.save(function(err)
    {
        if(err){
          res.json({'err':1,'msg':'dicardede'})
        }
        else
        {
            res.json({'err':0,'msg':'added to cart'})
        }
    })


        }
    })

})


// get cart details
app.get('/api/getcartdata/:uid',function(req,res)
{
    let uid=req.params.uid;
    cartModel.find({'email':uid},function(err,data)
    {   
        if(err){}
        else{
             let gt=0;
            for(let i=0;i<data.length;i++)
            {
                gt=gt+data[i].total;
            }
            res.json({'err':0,'cdata':data,'gtotal':gt});
        }
    })
})

//remove item from cart
 app.get('/api/removefromcart/:pn/:uid',function(req,res)
{   
    let pn=req.params.pn;
     let uid=req.params.uid;
    cartModel.remove({'pname':pn,'email':uid},function(err)
    {
        if(err){}
        else
        {
            res.json({'err':0,'msg':'removed from cart'});
        }
    })
})


 //get search data
 app.get('/api/getsearchdata/:sn',function(req,res)
{   
    let sn=req.params.sn;
    proModel.find({$or:[{'pname':sn},{'brand':sn},{'category':sn}]},function(err,data)
    {
        if(err){}
        else
        {
            res.json({'err':0,'sdata':data,'msg':'getsearchdata'});
        }
    })
})

//user sign up
app.post('/api/signupaccount',function(req,res)
{
    let email=req.body.email;
    let mobile=req.body.mobile
    let password=sha1(req.body.password);

    let ins=new userModel({'email':email,'mobile':mobile,'password':password});
    ins.save(function(err)
    {
        if(err){
           res.json({ 'err':1,'msg':'Data  not Save'})
        }
        else
        {
            res.json({ 'err':0,'msg':'Data Save'})
        }
    })
  
})

 
// account login
app.post('/api/loginaccount',function(req,res)
{
    let email=req.body.email;
    let password=sha1(req.body.password);
    
    userModel.find({'email':email,'password':password},function(err,data)
    {
       if(err){
         res.json({'err':1,'msg':'Email or password is not correct'})
       }
       else if(data.length==0)
       {
           res.json({'err':1,'msg':'Email or password is not correct'})
       }
       else
       {
           res.json({'err':0,'msg':'login succes'});
       }
    })

})


//place order
app.post('/api/placeorder/:uid',function(req,res)
{
  let uid=req.params.uid;
  let add=req.body.address;
  let mob=req.body.mobile;
  let altmob=req.body.altmobile;
 
  cartModel.find({'email':uid},function(err,data)
    {   
        if(err){}
        else{
             let gt=0;
            for(let j=0;j<data.length;j++)
            {
                gt=gt+data[j].total;
            }
for(let i=0;i<data.length;i++)
{
let ins=new orderModel({'pname':data[i].pname,'email':data[i].email,'price':data[i].price,'qty':data[i].qty,'brand':data[i].brand,'color':data[i].color,
  'size':data[i].size,'total':data[i].total,'address':add,'mobile':mob,'altmobile':altmob,'status':"upcoming",'gtotal':gt});
    ins.save(function(err)
    {
        if(err){
          res.json({'err':1,'msg':'dicarded'})
        }
        else
        {
   
            res.json({'err':0,'msg':'placed'})
             cartModel.remove({'email':uid},function(err)
    {
            if(err){}
            else
            {
               res.json({'err':0,'msg':'removed from cart'});
            }
          }) 
        }
    })  
}
      

}
})

})


//get myorder details
app.get('/api/getorderdetails/:uid',function(req,res)
{
  let uid=req.params.uid;
  orderModel.find({'email':uid},function(err,data)
  {
     if(err){}
      else
      {
        res.json({'err':0,'odata':data});
      }
     
  })
})

//get all order details
app.get('/api/getallorders',function(req,res)
{
  
  orderModel.find({},function(err,data)
  {
     if(err){}
      else
      {
        res.json({'err':0,'orderdata':data});
      }
     
  })
})


//changing the order of status by admin
app.get('/api/changeorderstatus/:uid',function(req,res)
{
    let uid=req.params.uid;
    orderModel.update({'_id':uid},{$set:{'status':"Delivered"}},function(err)
    {
      if(err){}
      else
      {
        res.json({'err':0});
      }
    })
})

//get feedbacks in adminpanel
app.get('/api/getfeedbacks',function(req,res)
{
    feedModel.find({},function(err,data)
    {
      if(err){}
      else
      {
        res.json({'err':0,'fdata':data,'msg':'getting'});
      }
    })
})