const client = require('./client');

async function init() {
    await client.set("user:43", "This is new and working")
    await client.expire("user:1", 20)
    const res = await client.get("user:43");
    console.log("Result -> ", res);

}

init();