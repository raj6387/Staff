const {Member}=require("./MemberModel")
const {Members}=require("./MemberLoginModel")
const {changePassword}=require("./ChangePasswordModel")
const {Media}=require("./MediaModel");
const { Delete } = require("./MemberDeleteModel");
const MemberList= {
    type: "object",
    properties: {
      ...Member,
    },
  };
  const MemberRegister = {
    responses: {
      ...Member,
    },
  };
  const requestMemberLogin={
    type:"object",
    properties: {
        ...Members

    },
  };
  const responseMemberLogin={
    responses: {
        ...Members
    }
  }
  const requestChangePassword={
    type:"object",
    properties: {
        ...changePassword
    }
  }
  const requestUploadMedia={
    type:"object",
    properties: {
        ...Media

    }
  }
  const requestDeleteMember={
    type:"object",
    properties: {
        ...Delete

    }
  }

  module.exports={MemberList,MemberRegister,requestMemberLogin,responseMemberLogin,requestChangePassword,requestUploadMedia,requestDeleteMember}
  
