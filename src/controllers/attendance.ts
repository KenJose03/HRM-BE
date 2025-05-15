import { Attendance } from "../schema/UserModels";
import { formatTime } from "../utils/utils";

export const loginAttendance = async (req: any, res: any) => {
    const userId = req.params.id;
    const status = req.body.status;
    const today = new Date();
    const dateOnly = new Date(today.setHours(0, 0, 0, 0));

    try {
        const existing = await Attendance.findOne({ userId: userId, date: dateOnly });
        if (existing) {
            res.status(200).json({ message: "Attendance already marked" });
            return;
        }
        const newAttendance = new Attendance({
            userId: userId,
            date: dateOnly,
            checkInTime: today,
        });
        if (status !== "Present") {
            newAttendance.status = "Leave";
        }
        else {
            newAttendance.status = "Present"
        }
        await newAttendance.save();
        console.log('Attendance created:', newAttendance);
        res.status(200).json({ message: "Attendance marked successfully at" });
    }
    catch (error: any) {
        console.error("Attendance save error:", error);
        res.status(500).json({ message: "Error: Attendance not marked", error: (error as Error).message, time: formatTime(today) });
    }
    return;
}

export const logoutAttendance = async (req: any, res: any) => {

    const userId = req.params.id;
    const today = new Date();
    const dateOnly = new Date(today.setHours(0, 0, 0, 0));
    try {

        const attendance = await Attendance.findOne({ userId: userId, date: dateOnly, status: "Present" });
        if (!attendance) {
            res.status(404).json({ message: "You are absent for today" });
            return;
        }

        attendance.checkOutTime = today;
        await attendance.save();
        res.status(200).json({ message: "Logout marked successfully at", time: formatTime(today) });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching document" });
    }

    return;

}

export const updateAttendance = async (req: any, res: any) => {
    const userId = req.params.id;
    const checkInTime = req.body;
    const dateOnly = new Date(checkInTime.setHours(0, 0, 0, 0));
    try {
        const updatedAttendance = await Attendance.findOneAndUpdate({ userId: userId, date: dateOnly, status: "Present" }, {
            checkInTime
        }, { new: true });
        res.status(200).json({ message: "Login time updated successfully", updatedAttendance });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating Attendance" });
    }

    return;
}

export const getAttendance = async (req: any, res: any) => {
    const userId = req.params.id;
    try {
        const attendance = await Attendance.find({ userId: userId });
        if (!attendance) {
            res.status(404).json({ message: "No attendance found" });
            return;
        }
        res.status(200).json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching attendance" });
    }

    return;
}