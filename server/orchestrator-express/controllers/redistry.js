const Redis = require("ioredis");
const redis = new Redis();

redis.set("judul", coba)
redis.get("judul")
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})