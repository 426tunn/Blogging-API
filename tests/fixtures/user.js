module.exports = {
    validUser: {
        firstName: "Ben",
        lastName: "White",
        email: "benwhite@gmail.com",
        password: "BenWhite"
    },
    noFirstname: {
        firstName: "",
        lastName: "White",
        email: "benwhite@gmail.com",
        password: "BenWhite"
    },
    noLastname: {
        firstName: "Ben",
        lastName: "",
        email: "benwhite@gmail.com",
        password: "BenWhite"
    },
    noEmail: {
        firstName: "Ben",
        lastName: "White",
        email: "",
        password: "BenWhite"
    },
    invalidEmail: {
        firstName: "Ben",
        lastName: "White",
        email: "jones.com",
        password: "BenWhite"
    },
    noPassword: {
        firstName: "Ben",
        lastName: "White",
        email: "benwhite@gmail.com",
        password: ""
    },
    validLogin: {
        email: "benwhite@gmail.com",
        password: "BenWhite"
    },
    invalidEmailLogin: {
        email: "wrong@gmail.com",
        password: "BenWhite"
    },
    invalidPasswordLogin: {
        email: "benwhite@gmail.com",
        password: "wrong"
    }
}