//Database Connection parameters ******
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mydbuser',
  host: '129.40.47.8',
  database: 'samdb',
  password: 'mydbpassword',
  port: 30555,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": {"require":true}
  }
})

console.log('**** I am in Queries Module *****');

//**** api to get all users **************************************

const getAllUser = (request, response) => {
  try {
  pool.query('SELECT * FROM biosid_stage' , (error, results) => {
    if (error) {
     response.send(error)
     return
    }
    response.status(200).json(results.rows)
  })
   }
  catch(e){
    response.send(e)}
}

//*******api to get a single user **********************************

const getUser = (request, response) => {

   try {

        console.log("getUser ",request.query.serialNumber);
        let sn = request.query.serialNumber;
        var  selString =  `SELECT
serialnumber  AS "serialNumber",
lastname  AS "lastName",
firstname  AS "firstName",
middlename  AS "middleName",
dateofbirth AS "dateOfBirth",
age  AS "age",
sex  AS "sex",
maritalstatus  AS "maritalStatus",
employer  AS "employer",
organization  AS "organization",
position  AS "position",
encode(photo, 'base64') AS "photo",
encode(signature,'base64')  AS "signature",
phonenumber  AS "phoneNumber",
email  AS "email",
address1  AS "address1",
address2  AS "address2",
addresscity  AS "addressCity",
addressstate  AS "addressState",
addresszipcode  AS "addressZipcode",
expirydate  AS "expiryDate",
ipaddress  AS "ipaddress",
uniqueid  AS "uniqueId",
approved  AS "approved",
reviewed  AS "reviewed",
height  AS "height",
weight  AS "weight",
haircolor  AS "hairColor",
eyecolor  AS "eyeColor",
addressunit  AS "addressUnit",
voterparty  AS "voterParty",
voterprecinct  AS "voterPrecinct",
voterlastvoted  AS "voterLastVoted",
exportedtocee  AS "exportedToCEE",
facetemplate   AS "faceTemplate",
iristemplateleft  AS "irisTemplateLeft",
iristemplateright  AS "irisTemplateRight",
voiceprint  AS "voicePrint",
palmprintleft  AS "palmPrintLeft",
palmprintright AS "palmPrintRight",
li  AS "LI",
lt  AS "LT",
lm  AS "LM",
lr  AS "LR",
lp  AS "LP",
ri  AS "RI",
rt  AS "RT",
rm  AS "RM",
rr  AS "RR",
rp  AS "RP"

        FROM biosid_stage WHERE serialnumber = $1`
        console.log(selString)

    pool.query(selString, [sn], (error, results) => {
    if (error) {
      response.send(error)
      return
    }
      console.log("HEEEEEELLLLLOOOOOO")
      console.log(results)
      const fields = results.fields.map(field => field.name);
//    console.log(fields);
      const bufdata = results.rows[0];
      console.log(bufdata)

        if (results.rows.length == 0){
           response.send("No Serial Number")
        return;
        }

     console.log(Object.keys(bufdata))
     Object.keys(bufdata).forEach(function(bufkey){
//   console.log(Buffer.isBuffer(bufdata[bufkey]))
        if (Buffer.isBuffer(bufdata[bufkey])){
         console.log(bufdata[bufkey])
         bufdata[bufkey]=bufdata[bufkey].toString('base64')
         console.log('How was my bufdata')
         console.log(bufdata[bufkey])
         console.log('why I am here')
       }

    })

//    console.log(results);
//    console.log(results.rows[0].lr_image)
//    console.log(results.rows[0].lr_image.toString('base64'))
//    response.status(200).send(JSON.stringify(bufdata))
      response.status(200).json(bufdata)
 })

}
 catch(e){
    response.send(e)}

}

//*******api to submit a single user **********************************

const submitUser = (request, response) => {
  console.log("submitUser ",request.headers)
  console.log("Got body:", request.body)
  console.log(request.body.txtPhoto)
  //Database Connection parameters ******
const subPool = require('pg').Pool
const subpool = new Pool({
  user: 'mydbuser',
  host: '129.40.47.8',
  database: 'samdb',
  password: 'mydbpassword',
  port: 31010,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": {"require":true}
  }
})
//******************************************************
  const values = [
request.body.txtSerialNum,
request.body.txtLast,
request.body.txtFirst,
request.body.txtMiddle,
request.body.txtDob,
request.body.txtSex,
request.body.txtEmployer,
request.body.txtOrganization,
request.body.txtPosition,
request.body.txtPhoto,
request.body.txtSignature,
request.body.txtAddress1,
request.body.txtAddressCity,
request.body.txtAddressState,
request.body.txtAddressZipcode,
request.body.txtAddressUnit,
request.body.txtVoterPrecinct,
request.body.txtVoterLastVoted,
request.body.faceTemplate,
request.body.irisTemplateLeft,
request.body.irisTemplateRight,
request.body.LI,
request.body.LT,
request.body.LM,
request.body.LR,
request.body.LP,
request.body.RI,
request.body.RT,
request.body.RM,
request.body.RR,
request.body.RP,
request.body.LI_image,
request.body.LT_image,
request.body.LM_image,
request.body.LR_image,
request.body.LP_image,
request.body.RI_image,
request.body.RT_image,
request.body.RM_image,
request.body.RR_image,
request.body.RP_image


]

//console.log(values)

 var queryString = `INSERT INTO biosid_stage (
serialnumber,lastname, firstname, middlename, dateofbirth,  sex, employer,organization,position, photo, signature,
address1, addresscity, addressstate, addresszipcode, addressunit, voterprecinct, voterlastvoted, facetemplate, iristemplateleft,iristemplateright, li, lt, lm
, lr, lp, ri,rt, rm, rr, rp,
li_image, lt_image,lm_image, lr_image,lp_image, ri_image,rt_image, rm_image,rr_image, rp_image
) VALUES(
 $1,$2,$3,$4,$5,$6,$7,$8,$9,
decode($10,'base64'),decode($11,'base64'),
$12,$13,$14,$15,$16,$17,$18,
$19,
$20,
$21,
$22,
$23,
$24,
$25,
$26,
$27,
$28,
$29,
$30,
$31,
decode($32,'base64'),
decode($33,'base64'),
decode($34,'base64'),
decode($35,'base64'),
decode($36,'base64'),
decode($37,'base64'),
decode($38,'base64'),
decode($39,'base64'),
decode($40,'base64'),
decode($41,'base64')
)`;
console.log(queryString)

 pool.query(queryString,values, (error, results) => {
    if (error) {
      response.send(error)
      return
    }
    response.status(200).send('SUCCESS')
  })
}

//*********************************************

module.exports = {
  getAllUser, getUser, submitUser
} 


console.log('**** I am out of Queries *****');




