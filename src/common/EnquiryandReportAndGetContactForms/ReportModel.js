const ReportModel = {
    name: 'ReportModel',
    properties: {
        name: "",
        email: "",
        phone: "",
        reportType: "",
        issueType: "",
        description: "",
        status: "",
        description: "",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
};

export default ReportModel;