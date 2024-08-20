import { RepairRequest } from "../models/RepairRequest.model.js";
import { checkNullUndefined } from "../utils/tools.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { PendingAction } from "../models/pendingActions.model.js";


const addPendingAction = async (req, res) => {
    const { repairRequestId, comment, response} = req.body;

    if (checkNullUndefined(repairRequestId, comment, response)) {
        return res.status(400).json({ error: "Required fields not present" });
    }
    // console.log(req)
    console.log("adding Pending Action")
    

    
    try {
        const pendingAction = await PendingAction.create({
            repairRequestId, comment, response
        });

        const createdPendingAction = await PendingAction.findById(pendingAction._id).populate('repairRequestId');

        if (!createdPendingAction) {
            return res.status(400).json({
                status: "Failed",
                message: "Something went wrong",
            });
        }

        res.status(201).json({ message: "Pending Action created successfully", body: PendingAction });
    } catch (error) {
        console.error("Error creating Pending Action:", error);
        res.status(500).json({ error: `Internal server error ${error} error ` });
    }
};

const getRepairRequestsPendingAction = async (req, res) => {
    const {repairRequestId} = req.body

    if (checkNullUndefined(repairRequestId) ) {
      return res.status(400).json({ error: "invalid credentials null" })
    }

    try {
      const pendingAction = await PendingAction.find({repairRequestId:repairRequestId});
  
      res.status(201).json({ message: "ok", body: pendingAction });
    } catch (error) {
      console.error("Error getting pendingAction : ", error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  };
  

const getAllPendingActions = async (req, res) => {
    try {
        const allPendingAction = await PendingAction.find({});

        // if (!allPendingAction.length) {
        //     return res.status(400).json({
        //         status: "Failed",
        //         message: "No PendingAction found",
        //     });
        // }

        res.status(200).json({ message: "ok", body: allPendingAction });
    } catch (error) {
        console.error("Error getting all Pending Actions", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    addPendingAction,
    getRepairRequestsPendingAction,
    getAllPendingActions
};
