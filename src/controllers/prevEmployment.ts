import { PrevEmployment, SocialLinks, User } from "../schema/UserModels";

export const postPrevEmployment = async (req: any, res: any) => {
    const userId = req.id;
    const { companyName, designation, empType, address, dateOfJoining, dateOfLeaving } = req.body;
    const user = await User.findById(userId);
    if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const newPrevEmployment = new PrevEmployment({
        userId: userId,
        companyName: companyName,
        designation: designation,
        empType: empType,
        address: address,
        dateOfJoining: dateOfJoining,
        dateOfLeaving: dateOfLeaving
    });
    try {

        await newPrevEmployment.save();
        res.status(201).json({ message: "PrevEmployment created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating prev employment" });
        console.log(error);
    }

    return;
}


export const getPrevEmploymentById = async (req: any, res: any) => {
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    try {
        const prevEmployment = await PrevEmployment.findOne({ userId: userId });
        res.status(200).json(prevEmployment);

    }
    catch (error) {
        res.status(500).json({ message: "Error fetching prev employment" });

    }
    return;
}

export const updatePrevEmployment = async (req: any, res: any) => {
    const userId = req.id;
    const user = await User.findById(userId);
    console.log(userId, "userId");
    console.log(user, "user");

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    try {
        const { companyName,
            designation,
            empType,
            address,
            dateOfJoining,
            dateOfLeaving } = req.body;

        const updatedUser = await PrevEmployment.findOneAndUpdate({ userId: userId }, {
            companyName,
            designation,
            empType,
            address,
            dateOfJoining,
            dateOfLeaving
        }, { new: true });

        res.json(updatedUser);
        console.log("Updated User", updatedUser);

    }
    catch (error) {
        res.status(403).json({ message: "Unauthorized" });
    }
    return;
}