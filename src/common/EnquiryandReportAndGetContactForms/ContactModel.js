const ContactModel = {
    name: 'ContactModel',
    properties: {
        firstName: "",
        email: "",
        phoneNumber: "",
        inquiryDate: new Date().toISOString(),
        AdvertiseID: "",
        CreatedBy: "Public",
        isContactRequested: true,
        isVerified: true,
        preferredContactMethod: "Phone",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
};

export default ContactModel;