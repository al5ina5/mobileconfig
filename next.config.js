module.exports = {
    headers: [
        {
            source: "/api/download/(.*)",
            headers: [
                {
                    key: "Content-disposition",
                    value: "attachment",
                },
            ],
        },
    ],
};
