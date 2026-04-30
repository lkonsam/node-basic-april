

export const getAllUser =  (req, res) => {
    res.send("We got it");
};

export const getProfile = (req, res) => {
    res.json({
        name: "Konsam",
        isAdmin: false
    });
};