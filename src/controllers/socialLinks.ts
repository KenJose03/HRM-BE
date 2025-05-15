import { SocialLinks, User } from "../schema/UserModels";

export const postSocialById = async (req: any, res: any) => {
    const { userId, fb_link, x_link, linkedin_link } = req.body;
    const newSocial = new SocialLinks({
        fb_link: fb_link,
        x_link: x_link,
        linkedin_link: linkedin_link,
        userId: userId
    });
    try {
        await newSocial.save();
        res.status(201).json(newSocial);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error creating social links" });
        return;
    }

}

export const getSocialById = async (req: any, res: any) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    try {
        const social = await SocialLinks.findOne({ userId: userId });
        res.status(200).json({ message: "Social Links fetched successfully" });
        return
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching social links" });
        return;
    }


}

export const updateSocialById = async (req: any, res: any) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    try {
        const { fb_link, x_link, linkedin_link } = req.body;
        const updatedLinks = await SocialLinks.findOneAndUpdate({ userId: userId }, {
            fb_link: fb_link,
            x_link: x_link,
            linkedin_link: linkedin_link
        }, { new: true });

        res.json({ message: "Social Links updated successfully", updatedLinks });
        return
    }
    catch (error) {
        res.status(500).json({ message: "Error updating social links" });
        return;
    }
}