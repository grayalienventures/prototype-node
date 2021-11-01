const path = require("path")
const fs = require('fs')
const fileName = path.join(__dirname, "../.env")
const content = `NODE_ENV=development
PORT=3000
HTTPS=false
APP_URL="https://domain.com"
END_POINT=https://domain.com/admin
APP_TITLE=Domain
APP_Slug=domain
ENABLED_DEBUG=true
SECURE_AUTH_KEY=
LOCAL_END_POINT=http://127.0.0.1/domain
LOCAL_SERVER_SOCKET=http://127.0.0.1:3000`

if (!fs.existsSync(fileName)) {
    fs.writeFile(fileName, content, err => {
        if (err) throw err
    })
}