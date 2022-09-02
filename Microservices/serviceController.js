const axios=require("axios");
axios.default.withCredentials=true

const request = require('request')

//const api=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDYxNDVlMjdlZDVjZjU1ZGViMWQ3MCIsImlhdCI6MTY2MTM1NTI2OSwiZXhwIjoxNjYzOTQ3MjY5fQ.MytWjGcCopbFmgpQxCEvGF1BIr-uja3wVonl_xghfUw

const url="http://localhost:5000/api/medicine/view";

const loginurl="http://localhost:5000/api/admin/login";
const url2="http://localhost:5000/api/medicine/";
const reorderurl = "http://localhost:5000/api/admin/reordermedicine"

var MedicinDetails=
{
    
     getMedicine:function(req,res)
    {
        axios({
            method: 'get',
            url: url,
           responseType: 'json', withCredentials: true
           
          })
          .then(function (response) {
            console.log(response.data)
            res.send(response.data)
           }) 
           .catch(error => { console.log(error)})
    
   
    },
    getMedicinebyvalue:function(req,res)
    {
        axios({
            method: 'get',
            url: url2,
           responseType: 'json', withCredentials: true
           
          })
          .then(function (response) {
            console.log(response.data)
            res.send(response.data)
           }) 
           .catch(error => { console.log(error)})
    
   
    },
 
    Login:function(req,res)
    { axios({
      method: 'post',
      url: loginurl,
      data:req.body, withCredentials: true
    })
    .then((e) => {

      console.log(e)

  })

  res.send("succcesssfull")
   
    },

    reorderMed: function(req, res) {
      axios({ method: 'post', url: reorderurl, data: req.body}).then((e)=>{
          console.log(e.data);
          res.send("reorder medicine Added. ")
      })

  }
   
}
module.exports=MedicinDetails
