const Lead = require("../model/LeadModel");

const getAllLeads = async (request, response) => {
  const { startDate, endOfDate } = request.query;

  let customQuery = {};

  if (startDate && endOfDate) {
    customQuery.createdAt = {
      $gte: startDate,
      $lte: endOfDate,
    };
  }

  // if (new Date(startDate) === new Date(startDate)) {
  //   customQuery.startDate = startDate;
  // }

  try {
    const Allleads = await Lead.find(customQuery ? customQuery : {}).sort(
      "createdAt"
    );
    if (Allleads.length === 0) {
      return response.json({
        message: "No record Found",
      });
    }
    response.json({
      data: Allleads,
    });
  } catch (error) {
    return response.status(500).json({
      detail: error,
    });
  }
};

const CreateLeadController = async (request, response) => {
  const { name, email, contact, date } = request.body;

  if (!name || !email || !contact) {
    return response.json({
      detail: "Make sure all data are provided",
    });
  }
  try {
    const newLead = new Lead({
      name,
      email,
      phone: contact,
      createdAt: date,
    });

    await newLead.save().then(() => {
      return response.status(200).json({
        message: "Your details have been saved Thank you!",
      });
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      detail: `Error was while registering `,
    });
  }
};

const DeleteLeadController = async (request, response) => {
  const { id } = request.params;
  try {
    const findLead = await Lead.findOneAndDelete({ _id: id });

    if (findLead === null) {
      return response.status(404).json({
        message: "Record was not found",
      });
    }
    return response.status(200).json({
      message: "Record Deleted",
    });
  } catch (error) {
    response.status(500).json({
      detail: "Failed to delete",
    });
  }
};
const UpdateLeadController = async (request, response) => {
  const { id } = request.params;
  const { name, email, contact } = request.body;
  const query = { name, email, phone: contact };
  try {
    const updateRecord = await Lead.findOneAndUpdate({ _id: id }, query, {
      new: true,
      runValidators: true,
    });
    if (!updateRecord) {
      return response.json({
        detail: "Failed to Update Record",
      });
    }
    await updateRecord.save();
    return response.json({
      data: updateRecord,
    });
  } catch (error) {
    console.log(error);
    response.json({
      detail: `${error.valueType} found in wrong fields`,
    });
  }
};

const selectedLeadController = async (request, response) => {
  const { id } = request.params;
  try {
    const findLead = await Lead.find({ _id: id });
    if (!findLead) {
      return response.status(404).json({
        detail: "Record was not found",
      });
    }
    return response.status(200).json({
      data: findLead,
    });
  } catch (error) {
    return response.json({
      detail: "Error while connecting to the server",
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
