const crypto = require('crypto')
const PUBLICKEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmJ5ebgT7ieQq+0qyRb4
08SkD7DmRjiJX9BhbJuPerDSc/+rxmsXAfZfKJAGkv5YCSyIf2z4cptsygwQkE75
+lggyE38zerXZWKVmiVqol3guSc2n52wuQA0hMCmmk7H0aBnLDGiaG60m5Zqy4IY
NBCc2oAhOPtKJ2oSBLo4pn26jdTwzaWCSsxV6+H43mZkooTWOHUg5hEhWl2JpJmq
lkfGWSrcN1auviI8pxtuvEQNzRtrAHcwbOJcGrCEyUk8gb67wv1KgHbgCklwtWtw
kWcUVYmrvnzKzLrGL/rs0kxrq52EBlsbisKA3hBkIQYOfflKJ1FNuk0f14Hpv+Vl
ZwIDAQAB
-----END PUBLIC KEY-----`

console.log(crypto.publicEncrypt(PUBLICKEY, Buffer.from("thainq00@gmail.com")).toString('base64'))