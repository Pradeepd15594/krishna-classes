require('dotenv').config()
module.exports = {
    port: process.env.PORT || 3200,
    jwt: {
        secret: (process.env.JWT_SECRET || 'testCard@123'),
        options: { expiresIn: 365 * 60 * 60 * 24 } // 365 days
    },

    db: {
        mongo: {
            uri: (process.env.URI || 'mongodb+srv://pradeepd15594:pradeepd15594@aura-card.y9vyuct.mongodb.net/aura-card-db?retryWrites=true&w=majority'),
            options: {
                user: (process.env.DB_USER || 'pradeepd15594'),
                pass: (process.env.DB_PASSWORD || 'pradeepd15594')
            }
        }
    },
    emailVericationLinkExpireTime: 365 * 60 * 60 * 24, //365 days,
    emailVericationOtpExpireTime: 1000 * 60 * 10, //10 min
    otpExpireTime: 1000 * 60 * 10, //10 min
    baseUrl: (process.env.BASE_URL || 'https://flutternodejs-with-mongodb.onrender.com/login')
}
