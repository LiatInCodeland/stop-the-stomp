const supertest = require("supertest");
const { app } = require("./server");
const cookieSession = require("cookie-session");

test("GET /petition redirected to the registration page when they attempt to go to the petition", () => {
    cookieSession.mockSessionOnce({
        userId: false,
        loggedIn: false,
    });
    return supertest(app)
        .get("/petition")
        .then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers.location).toBe("/register");
        });
});

test("redirected to the petition page when they attempt to go to registration or login page", () => {
    cookieSession.mockSessionOnce({
        userId: true,
        loggedIn: true,
    });
    return supertest(app)
        .get("/login", "/register")
        .then((res) => {
            expect(res.statusCode).toBe(302);
            expect(res.headers.location).toBe("/petition");
        });
});

test("redirected to the thank you page when they attempt to go to the petition page or submit a signature", () => {
    cookieSession.mockSessionOnce({
        userId: true,
        loggedIn: true,
        signatureId: true,
    });
    return supertest(app)
        .get("/petition")
        .then((res) => {
            expect(res.headers.location).toBe("/thanks");
        });
});

test.only("redirected to petition page when attempt to go to thank you or the signers", () => {
    cookieSession.mockSessionOnce({
        userId: true,
        loggedIn: true,
        signatureId: false,
    });
    return supertest(app)
        .get("/thanks", "/signers")
        .then((res) => {
            expect(res.headers.location).toBe("/petition");
        });
});

// console.log("app in server.test.js: ", app);
// test("GET /petition sends 200 status code as a response", () => {
//     return supertest(app)
//         .get("/petition")
//         .then((res) => {
//             // console.log('response', res);
//             // console.log("response", res.statusCode);
//             expect(res.statusCode).toBe(200);
//         });
// });

// test("POST /petition redirects to /thanks", () => {
//     cookieSession.mockSessionOnce({
//         signatureId: true,
//     });
//     return supertest(app)
//         .post("/petition")
//         .then((res) => {
//             // expect(res.statusCode).toBe(302);
//             expect(res.headers.location).toBe("/thanks");
//         });
// });

// test.only("GET / petition sends 200 if there is a cookie", () => {
//     cookieSession.mockSessionOnce({
//         userId: true,
//         loggedIn: true,
//         signatureId: true,
//     });
//     return supertest(app)
//         .get("/petition")
//         .then((res) => {
//             expect(res.statusCode).toBe(200);
//         });
// });

// test("GET /home sends 302 when there is NO cookie", () => {
//     cookieSession.mockSessionOnce({});

//     return supertest(app).get(
//         "/home".then((res) => {
//             expect(res.statusCode).toBe(302);
//             expect(res.headers.location).toBe("/thanks");
//         })
//     );
// });

// test("GET /home sends 200 if there IS a cookie", () => {
//     cookieSession.mockSessionOnce({
//         submitted: true,
//     });
//     return supertest(app)
//         .get("/home")
//         .then((res) => {
//             expect(res.statusCode).toBe(200);
//         });
// });
