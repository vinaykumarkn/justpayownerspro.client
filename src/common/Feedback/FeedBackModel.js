const FeedBackModel = {
    name: 'FeedBackModel',
    properties: {
        fullName: "",
        feedbackCategory: "",
        comments: "",
        contactEmail: "",
        contactPhone: "",
        isAnonymous: false, 
        createdDate: new Date().toISOString(),
        updatedAt: new Date().toISOString() 
    }
};

export default FeedBackModel;