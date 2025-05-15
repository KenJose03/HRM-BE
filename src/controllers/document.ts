import { Document } from "../schema/UserModels";

export const postDocumentId = async (req: any, res: any) => {
    const userId = req.params.id;
    const { user_photo, aadhaar_front, aadhaar_back, pan_card } = req.body;

    const newDocument = new Document({
        userId: userId,
        user_photo: user_photo,
        aadhaar_front: aadhaar_front,
        aadhaar_back: aadhaar_back,
        pan_card: pan_card
    });

    try {
        await newDocument.save();
        res.status(201).json(newDocument);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating document" });
    }
    return;
}

export const getDocumentById = async (req: any, res: any) => {

    const userId = req.params.id;
    try {

        const userDocument = await Document.findOne({ userId: userId });

        if (!userDocument) {

            res.status(404).json({ message: "User not found" });

            return;

        }

        res.status(200).json(userDocument);
    }
    catch (error) {

        res.status(500).json({ message: "Error fetching document" });

    }

    return;

}

export const updateDocumentId = async (req: any, res: any) => {
    const userId = req.params.id;
    const { user_photo, aadhaar_front, aadhaar_back, pan_card } = req.body;
    try {

        const updatedDocument = await Document.findOneAndUpdate({ userId: userId }, {
            user_photo: user_photo,
            aadhaar_front: aadhaar_front,
            aadhaar_back: aadhaar_back,
            pan_card: pan_card
        }, { new: true });
        res.status(200).json({ message: "Document updated", updatedDocument });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating document" });
    }

    return;
}