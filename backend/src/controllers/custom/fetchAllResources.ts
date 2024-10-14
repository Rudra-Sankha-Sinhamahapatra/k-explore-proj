import { Resource } from "../../db/db";

export const fetchAllResources = async(req:any,res:any)=>{
    try {
  const Resources = await Resource.find({});
     
  if(!Resources) {
      return res.status(404).json({
          message:"No Resources found"
      })
  }

  return res.status(200).json({
      message:"Resources fetched successfully",
      Resources
  })
    }
  catch (error:any){
      return res.status(404).json({
          message:"Error"
      })
  }
}