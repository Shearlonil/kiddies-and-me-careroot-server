module.exports = {
    bora: {
        fname: "Ibrahim",
        lname: "Adubi",
        phone: "08034262759",
        email: "shearlonil@gmail.com",
        sex: "M",
        acc_creator: 1,
    },
    // 100 series => users/staff
    // 200 series => posts
    // 300 series => clients
    // 400 series => miscellaneous
    authorities: {
        activateDeactiveteAccount: {
            name: "Activate/Deactivate Accounts",
            code: 100,
            desc: "Ability to activate/deativate company staff accounts",
        },
        addStaffAccount: {
            name: "Add Staff Accounts",
            code: 101,
            desc: "Ability to add company staff accounts",
        },
        updateStaffRoles: {
            name: "Update Staff Roles",
            code: 102,
            desc: "Ability to add/remove staff roles/authorities",
        },
        viewStaff: {
            name: "View Registered Users",
            code: 103,
            desc: "View all registered staff accounts",
        },
        staffSearch: {
            name: "Staff Search",
            code: 104,
            desc: "Search Staff by ID or Email",
        },
        jobPosts: {
            name: "Job Posts",
            code: 200,
            desc: "Ability to post jobs",
        },
        reactToPost: {
            name: "React to Job Posts", // Attend to reported post and treat accordingly
            code: 201,
            desc: "Act on posts such as suspend/activate posts and remove flags", //  Act on reported posts such as deleting or pulling down a post
        },
        viewClients: {
            name: "View Clients",
            code: 300,
            desc: "View client accounts both seekers and employers. View unverified email addresses",
        },
        activateDeactivateClients: {
            name: "Activate/Deactivate Clients",
            code: 301,
            desc: "Activating/Deativating client accounts, both seekers and employers",
        },
        clientSearch: {
            name: "Client Search",
            code: 302,
            desc: "Search Clients (Seekers or Employers) by id or email",
        },
        sendNotifications: {
            name: "Send Notifications",
            code: 400,
            desc: "Send notifications when required",
        },
        editLocations: {
            name: "Edit Locations",
            code: 401,
            desc: "Ability to add/remove/update locations or states within the country",
        },
        editIndustries: {
            name: "Edit Industry",
            code: 402,
            desc: "Ability to add/remove/update job sectors or industries",
        },
        editQualifications: {
            name: "Edit Qualifications",
            code: 403,
            desc: "Ability to add/remove/update cert qualifications",
        },
        editJobExperience: {
            name: "Edit Job Experience",
            code: 404,
            desc: "Ability to add/remove/update required job experience",
        },
        updateYear: {
            name: "Update Current Year",
            code: 405,
            desc: "Setting Current year",
        },
        updateTermsAndAgreement: {
            name: "Update Terms and Agreement",
            code: 406,
            desc: "Updating Terms and Agreement",
        },
    },
};
