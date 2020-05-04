# pip install pycryptodome

import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

PRIVATEKEY = '''-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAtmJ5ebgT7ieQq+0qyRb408SkD7DmRjiJX9BhbJuPerDSc/+r
xmsXAfZfKJAGkv5YCSyIf2z4cptsygwQkE75+lggyE38zerXZWKVmiVqol3guSc2
n52wuQA0hMCmmk7H0aBnLDGiaG60m5Zqy4IYNBCc2oAhOPtKJ2oSBLo4pn26jdTw
zaWCSsxV6+H43mZkooTWOHUg5hEhWl2JpJmqlkfGWSrcN1auviI8pxtuvEQNzRtr
AHcwbOJcGrCEyUk8gb67wv1KgHbgCklwtWtwkWcUVYmrvnzKzLrGL/rs0kxrq52E
BlsbisKA3hBkIQYOfflKJ1FNuk0f14Hpv+VlZwIDAQABAoIBABW5OPrUgBs3vzWb
NCNrhwvCOkBcM7Fdfo9ZBKGpDbfxY7/JTi5+BumG7OKp9P6BKP8+vKtg0V7lQFn4
geiOX5v/7zesglYMiMdcrLEFj+PzBpdHImx0nd4LNjYxtCZhB8/iKSfMaanCteRq
UCIZRsS8zdIAvPRKihSTv72saJ772rlpCrLZ1leKv/vrzlVQcZRxxgM2iSVx0TgJ
oh3oXAFXd5K78kdyzsvE45B0qv5xq8VABT0gXj+iUHNo9Y3+NS0hBzBuz6AoH0V2
va8XvAYMlno7+JagNGMZeJ9G6wLMbYSUJ07bciceuTPiRFVuo4nlLGUjRhQ+cQjJ
M7LbVXECgYEAunCLjvQKr5+/nK2cKyvIgqU2ajDL3VqxwRtrTBLEug88YmWgYBzO
Wi1u6sEIdDkoJ2+H8SOL5LNE2dyGAroXeGES8m9TaD8kwdkR/gnCaHV9PhoF/JI/
khpM/WTdBT3oE0QN5Wd94nVH/ebaYUipaLf5tEIOjrEVIhV3lh+DOEsCgYEA+m6g
atbl4o+6bEiTyEhVo2MO+x2/Sl3SNArnrORUQPOMcVNA2+K+smgLbg7+uqfy9t04
4SFomCNULPvwXPguDgEdgpJ/1p0n5XhQ/ZjKDX6bcFfmgJV8auWHTubPpUbh4BQT
MrDgeCnZNrrA/YrNTOF1HUOoCzPV5DP2ojO7TdUCgYAXMk2K2b5Cn6OdgNQ/YtEt
wBSHHc8fmVsoZZrx+hvT8nVW4MIVc0ARZDm6p42/uCTQ00WcsQmEyPE2EgPybujg
p2NOGp/MBp8yJynf66LukD+m7GH2TNPv/6m4lUYSkuM/EmaQNlIpTOJKKuDc3ceG
Ke29icJ56npwpS8d1InlBQKBgAW1e+azm238xM0vIl9QdtNQsMi8tt2lIeOZ1Ao2
8kzAwJTcxv+8PYinoosRwHDU308NX/yR3GaLd6HG5IXaCoK7N8cAO/XSg1RR19bQ
ItsH5dc7yb9oqPtu3BTKYjVsVj3bd0ySh6t1mMQModWl0mRMR3UxU6VduySGorqz
3zM5AoGABEE/SqCQhpouwYhjXEq7ke2EFyCbk58gYwmNpTr8CqcisIM0BKx9wObc
CEj5Oz37WckXmpGuuijQUY3yKodQHh+QEdGSF2ggTaYmgNE7KO+K6vCN2QpmMDLH
75V3OnDZeC4XgUvW1Edp4UZlUOkABwx78L7SwDfqlvnd2qMW/PM=
-----END RSA PRIVATE KEY-----'''

PUBLICKEY = '''-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmJ5ebgT7ieQq+0qyRb4
08SkD7DmRjiJX9BhbJuPerDSc/+rxmsXAfZfKJAGkv5YCSyIf2z4cptsygwQkE75
+lggyE38zerXZWKVmiVqol3guSc2n52wuQA0hMCmmk7H0aBnLDGiaG60m5Zqy4IY
NBCc2oAhOPtKJ2oSBLo4pn26jdTwzaWCSsxV6+H43mZkooTWOHUg5hEhWl2JpJmq
lkfGWSrcN1auviI8pxtuvEQNzRtrAHcwbOJcGrCEyUk8gb67wv1KgHbgCklwtWtw
kWcUVYmrvnzKzLrGL/rs0kxrq52EBlsbisKA3hBkIQYOfflKJ1FNuk0f14Hpv+Vl
ZwIDAQAB
-----END PUBLIC KEY-----'''

private_key = PRIVATEKEY.encode("ascii")
public_key = PUBLICKEY.encode("ascii")

def encrypt(text):
    text = text.encode("ascii")
    rsa_public_key = RSA.importKey(public_key)
    rsa_public_key = PKCS1_OAEP.new(rsa_public_key)
    encrypted_text = rsa_public_key.encrypt(text)
    return base64.b64encode(encrypted_text).decode("ascii")

def decrypt_code(code):
    code = base64.b64decode(code.encode("ascii"))
    rsa_private_key = RSA.importKey(private_key)
    rsa_private_key = PKCS1_OAEP.new(rsa_private_key)
    decrypted_text = rsa_private_key.decrypt(code).decode("ascii")
    return decrypted_text

encrypt = encrypt('A message for encryption')
text = decrypt_code(encrypt)
print(encrypt)
print(text)

# api get all WF
https://maxflow.app/api/virtual-assistant?code=

# api run WF
https://maxflow.app/api/virtual-assistant?code=&workflow_name=

# api check status WF
https://maxflow.app/api/virtual-assistant/wf_complete?code=&workflow_name=