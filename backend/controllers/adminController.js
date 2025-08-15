import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from cloudinary
import doctorModel from '../models/doctor.Model.js'

//API FOR ADDING DOCTOR
const addDoctor=async(req,res)=>{

    try {
        const{name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file

        //checking for all data to doctor

        if(!name || !email|| !password || !speciality|| !degree || ! experience||!about || !fees ||!address){
            return res.json({success:false,message:"Missing Details"})

        }
        //validating email
        if(validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }
        //password
        if(password.length<8){
            return res.json({success:false,message:"Invalid Password"})

        }

        //hashing doctorpassword
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //upload image to cloudinary

        const imageupload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageupload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})




    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

export {addDoctor}