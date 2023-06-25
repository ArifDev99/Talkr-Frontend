export const getSenderName = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].firstname : users[0].firstname;
};
export const getSenderImg = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].profile_img : users[0].profile_img;
};