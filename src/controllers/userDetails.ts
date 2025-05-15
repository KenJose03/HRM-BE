import { User, UserDetails } from "../schema/UserModels";


export const postUserDetails = async (req: any, res: any) => {
    const userId = req.id;
    const {
        fullName,
        residece,
        dateOfBirth,
        fullAddress,
        designation,
        empRole,
        empType,
        team,
        address,
        datOfJooining,
        dateOfLeaving
    } = req.body;
    const newUserDetails = new UserDetails({
        userId,
        fullName,
        residece,
        dateOfBirth,
        fullAddress,
        designation,
        empRole,
        empType,
        team,
        address,
        datOfJooining,
        dateOfLeaving
    });
    const user = await User.findById(userId);
    if (!user) {
        try {
            await newUserDetails.save();
            res.status(201).json(newUserDetails);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error creating user details" });
            console.log(error);

            return;
        }
    }
    else {
        res.status(400).json({ message: "User already exists" });
        return;
    }

}

export const getUserDetails = async (req: any, res: any) => {

    const userDetails = await UserDetails.find();;
    if (!userDetails) {
        res.status(404).json({ message: "No users found" });
        return;
    }

    console.log((req as any).isAdmin, "req.body");

    res.json(userDetails);

    return;
}

export const getUserDetailsById = async (req: any, res: any) => {

    const userId = req.params.id;

    try {

        const userDetails = await UserDetails.findOne({ userId: userId });
        if (!userDetails) {

            res.status(404).json({ message: "User not found" });

            return;

        }

        res.status(200).json(userDetails);

    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user details" });
        return;
    }
    return;
}

export const updateUserDetails = async (req: any, res: any) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const {
        fullName,
        residece,
        dateOfBirth,
        fullAddress,
        designation,
        empRole,
        empType,
        team,
        address,
        datOfJooining,
        dateOfLeaving } = req.body;
    try {

        const updatedUser = await UserDetails.findOneAndUpdate({ userId: userId }, {
            fullName,
            residece,
            dateOfBirth,
            fullAddress,
            designation,
            empRole,
            empType,
            team,
            address,
            datOfJooining,
            dateOfLeaving
        }, { new: true });
        res.status(200).json({ message: "User details updated", updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user details" });
        console.log(error);

    }

    return;
}