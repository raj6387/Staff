const { requestBodyOfMember, response200OfMember } = require("./MemberUtils")
const { MemberList, MemberRegister, requestMemberLogin, requestChangePassword,requestUploadMedia,requestDeleteMember } = require("./MemberSwagger")
const jsonDecl = {
    consumes: ["application/json"],
    produces: ["application/json"],
};

const openAPIDocumentation = {
    openapi: "3.0.2",
    info: {
        title: "Backend",
        description: "API testing",
        version: "0.1.0",
    },
    servers: [
        {
            url: "http://localhost:8080/api",
            description: "Server",
        },
    ],
    schemes: ["https", "http"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
    paths: {
        "/member/list": {

            get: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                tags: ["Member"],
                summary: "All Member",
                ...jsonDecl,
                ...requestBodyOfMember(),
                ...response200OfMember(),
            },
        },
        "/member/register": {

            post: {

                tags: ["Member"],
                summary: "Member Register",
                ...jsonDecl,
                ...requestBodyOfMember(MemberList),
                ...response200OfMember(MemberRegister),
            },
        },
        "/member/login": {

            post: {


                tags: ["Member"],
                summary: "Member Login",
                ...jsonDecl,
                ...requestBodyOfMember(requestMemberLogin),
                ...response200OfMember(),
            },
        },
        "/member/edit": {

            post: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],


                tags: ["Member"],
                summary: "Update profile",
                ...jsonDecl,
                ...requestBodyOfMember(MemberList),
                ...response200OfMember(),
            },
        },
        "/changePassword": {

            post: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],


                tags: ["Member"],
                summary: "ChangePassword",
                ...jsonDecl,
                ...requestBodyOfMember(requestChangePassword),
                ...response200OfMember(requestUploadMedia),
            },
        },
        "/member/delete": {

            delete: {
                security: [
                    {
                        bearerAuth: [],
                    },
                ],



                tags: ["Member"],
                summary: "MemberDelete",
                
                ...jsonDecl,
                ...requestBodyOfMember(requestDeleteMember),
                ...response200OfMember(),
            },
        },
        "/upload": {

            post: {


                tags: ["Member"],
                summary: "Media Upload",
                ...jsonDecl,
                ...requestBodyOfMember(requestUploadMedia),
                ...response200OfMember(),
            },
        },
    },
}




module.exports = openAPIDocumentation