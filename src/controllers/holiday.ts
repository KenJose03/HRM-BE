import { Holiday, SocialLinks, User } from "../schema/UserModels";

export const postHolidays = async (req: any, res: any) => {

    const { date, day, description } = req.body;

    const newHoliday = new Holiday({
        date: date,
        day: day,
        description: description
    });

    try {
        await newHoliday.save();
        res.status(201).json("New holiday created successfully");
    }
    catch (error) {
        res.status(500).json({ message: "Error creating holiday" });

    }

    return;
}

export const getHoliday = async (req: any, res: any) => {

    try {
        const holidays = await Holiday.find();
        if (!holidays) {
            res.status(404).json({ message: "No users found" });
            return;
        }

        res.status(200).json(holidays);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching holidays" });
    }

    return;

}

export const deleteHoliday = async (req: any, res: any) => {
    const holidayId = req.params.id;

    if ((req as any).isAdmin) {
        try {
            await Holiday.findByIdAndDelete(holidayId);
            res.json({ message: "Holiday deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting holiday" });
        }

    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }

    return;
}

export const updateHoliday = async (req: any, res: any) => {
    const holidayId = req.params.id;

    if ((req as any).isAdmin) {
        const { date, day, description } = req.body;
        try {

            const updatedHoliday = await Holiday.findByIdAndUpdate(holidayId, {
                date: date,
                day: day,
                description: description
            }, { new: true });
            res.json(updatedHoliday);
        }
        catch (error) {
            res.status(500).json({ message: "Error updating holiday" });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
    return;
}