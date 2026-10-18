
class LoginPage{

    constructor(page)
    {
        this.page = page;
        this.signInButton = page.locator("input#login");
        this.username = page.locator("input#userEmail");
        this.password = page.locator("input#userPassword");
    }

    async validLogin(username, password){
        await this.username.fill(username)
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle')
    }

    async goToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}

module.exports = { LoginPage };