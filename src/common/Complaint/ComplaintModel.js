const ComplaintModel = {
    name: 'ComplaintModel',
    properties: {
        complaintType: "",
        userName: "",
        contactEmail: "",
        contactPhone: "",
        status: "",
        description: "",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
};

export default ComplaintModel;