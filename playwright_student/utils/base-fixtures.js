const { test: base } = require('@playwright/test');

exports.customtest = base.extend(
    {
        TestDataForOrder: {
            username: "contact199@rahulshetty.com",
            password: "Learning123",
            productName: "ZARA COAT 3"
        }
    }
)

