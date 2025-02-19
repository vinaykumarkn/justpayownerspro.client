const FavoritesModel = {
    name: 'FavoritesModel',
    properties: {
        UserID: "",
        PropertyID: "",
        Note: "",
        Remark: "",
        Status: "",       
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
    }
};

export default FavoritesModel;

 //public Guid FavoriteID { get; set; }

 