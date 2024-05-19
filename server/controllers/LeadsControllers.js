const Lead = require("../model/LeadModel");

const getAllLeads = async (request, response) => {
  const { startDate } = request.query;

  let customQuery = {};

  if (startDate) {
    customQuery.createdAt = new Date(startDate);
  }

  try {
    const Allleads = await Lead.find(customQuery);
    if (Allleads.length === 0) {
      return response.json({
        total: Allleads.length,
        message: "No record found",
      });
    }
    response.json({
      total: Allleads.length,
      data: Allleads,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error,
    });
  }
};

const CreateLeadController = async (request, response) => {
  const { name, email, contact, date } = request.body;
  try {
    const newLead = new Lead({
      name,
      email,
      phone: contact,
      createdAt: date,
    });

    await newLead.save().then(() => {
      return response.status(200).json({
        message: "Your details have been added",
      });
    });
  } catch (error) {
    return response.status(400).json({
      message: `Error was found ${error}`,
    });
  }
};

const DeleteLeadController = async (request, response) => {
  const { id } = request.params;
  try {
    const findLead = await Lead.findOneAndDelete({ _id: id });

    if (findLead === null) {
      return response.status(404).json({
        id: id,
        message: "Record was not found",
      });
    }
    return response.status(200).json({
      message: "Record Deleted",
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to delete",
    });
  }
};
const UpdateLeadController = async (request, response) => {
  const { id } = request.params;
  const { name, email, phone } = request.body;
  const query = { name, email, phone };
  try {
    const updateRecord = await Lead.findOneAndUpdate({ _id: id }, query, {
      new: true,
      runValidators: true,
    });
    if (!updateRecord) {
      return response.json({
        message: "record was not found",
      });
    }
    await updateRecord.save();
    return response.json({
      data: updateRecord,
    });
  } catch (error) {
    response.json({
      message: error,
    });
  }
};

const selectedLeadController = async (request, response) => {
  const { id } = request.params;
  try {
    const findLead = await Lead.find({ _id: id });
    if (!findLead) {
      return response.status(404).json({
        message: "Not found",
      });
    }
    return response.status(200).json({
      data: findLead,
    });
  } catch (error) {
    return response.json({
      message: "Error found while find Lead",
    });
  }
};

module.exports = {
  getAllLeads,
  CreateLeadController,
  DeleteLeadController,
  UpdateLeadController,
  selectedLeadController,
};
