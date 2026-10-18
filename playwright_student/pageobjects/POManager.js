const { DashBoardPage } = require("./DashBoardPage");
const { LoginPage } = require("./loginpage");


class POManager{
    constructor(page)
    {   
        this.page = page;
        this.loginPage = new LoginPage(page)
        this.dashBoardPage = new DashBoardPage(page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getDashBoardPage(){
        return this.dashBoardPage
    }
}

module.exports = {POManager}