const authorizedUsers = [
    "258217948819357697",
    "490258312823046145",
    "397286381883359232",
    "284553236864827392",
    "769616659110952981"
];

module.exports = {
    isAuthorized(userId) {
        return authorizedUsers.includes(userId);
    }
};
