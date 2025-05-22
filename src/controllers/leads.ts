import { Leads } from "../schema/LeadsModel";
import { User } from "../schema/UserModels";

// GET / - Fetch all leads
export const getLeads = async (req: any, res: any) => {
    try {
        const leads = await Leads.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leads" });
    }
};

// GET /:id - Fetch a lead by ID
export const getLeadById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const lead = await Leads.findById(id);
        if (!lead) {
            res.status(404).json({ message: "Lead not found" });
            return;
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: "Error fetching lead" });
    }
};

// POST / - Create a new lead
export const postLeads = async (req: any, res: any) => {
    const { contact_person, contact_number, market_niche, service, assigned_to, status } = req.body;
    try {
        const existing = await Leads.findOne({ contact_person });
        if (existing) {
            res.status(400).json({ message: "Lead already exists" });
            return;
        }
        const assignedUser = await User.findOne({ username: assigned_to });
        if (!assignedUser) {
            res.status(400).json({ message: "Assigned user not found" });
            return;
        }
        const newLead = new Leads({
            contact_person,
            contact_number,
            market_niche,
            service,
            status,
            assigned_to: assignedUser._id
        });
        await newLead.save();
        res.status(201).json({ message: "Lead created successfully", lead: newLead });
    } catch (error) {
        res.status(500).json({ message: "Error creating lead" });
    }
};

// PUT /:id - Update a lead by ID
export const updateLead = async (req: any, res: any) => {
    const { id } = req.params;
    const { contact_person, contact_number, market_niche, service, assigned_to, status } = req.body;
    try {
        let updateData: any = {};
        if (contact_person !== undefined) updateData.contact_person = contact_person;
        if (contact_number !== undefined) updateData.contact_number = contact_number;
        if (market_niche !== undefined) updateData.market_niche = market_niche;
        if (service !== undefined) updateData.service = service;
        if (status !== undefined) updateData.status = status;
        if (assigned_to) {
            const assignedUser = await User.findOne({ username: assigned_to });
            if (!assignedUser) {
                res.status(400).json({ message: "Assigned user not found" });
                return;
            }
            updateData.assigned_to = assignedUser._id;
        }
        const updatedLead = await Leads.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedLead) {
            res.status(404).json({ message: "Lead not found" });
            return;
        }
        res.status(200).json({ message: "Lead updated", lead: updatedLead });
    } catch (error) {
        res.status(500).json({ message: "Error updating lead" });
    }
};

// DELETE /:id - Delete a lead by ID
export const deleteLead = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const deletedLead = await Leads.findByIdAndDelete(id);
        if (!deletedLead) {
            res.status(404).json({ message: "Lead not found" });
            return;
        }
        res.status(200).json({ message: "Lead deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting lead" });
    }
};