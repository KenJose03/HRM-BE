import { Leads } from "../schema/LeadsModel";
import { Contact, User } from "../schema/UserModels";

export const postLeads = async (req: any, res: any) => {
    const { contact_person,
        contact_number,
        market_niche,
        service,
        assigned_to,
        status
    } = req.body;

    const newLeads = new Leads({
        contact_person,
        contact_number,
        market_niche,
        service,
        status
    });

    try {

        const existing = await Leads.findOne({ contact_person: contact_person });

        const assigned_id = await User.findOne({ username: assigned_to });

        if (!assigned_id) {
            res.status(400).json({ message: "Assigned user not found" });
            return;
        }

        newLeads.assigned_to = assigned_id._id;

        res.status(400).json({ message: "Leads already exists" });
        return

        await newLeads.save();
        res.status(200).json({ message: "Contact created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating contact" });
    }

    return;
}

export const getContactById = async (req: any, res: any) => {

    const userId = req.params.id;
    try {

        const userDocument = await Contact.findOne({ userId: userId });
        res.status(200).json(userDocument);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching document" });
    }

    return;

}

export const updateContactId = async (req: any, res: any) => {
    const userId = req.params.id;
    const { primaryContact,
        alternateContact,
        primaryEmergencyContact,
        alternateEmergencyContact } = req.body;
    try {

        const updatedContact = await Contact.findOneAndUpdate({ userId: userId }, {
            primaryContact,
            alternateContact,
            primaryEmergencyContact,
            alternateEmergencyContact
        }, { new: true });
        res.status(200).json({ message: "Contact updated", updatedContact });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating Contact" });
    }

    return;
}