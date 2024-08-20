import { Router } from "express";
import { addPendingAction, getAllPendingActions, getRepairRequestsPendingAction } from "../controllers/pendingActions.controller.js";


const router = Router();

router.route("/add").post(addPendingAction);

router.route("/get").post(getRepairRequestsPendingAction);

router.route("/getall").get(getAllPendingActions);

export default router;
