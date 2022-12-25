async function getWeight() {

    //test
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(45025)
        }, 2000);
    })
}

module.exports.getWeight = getWeight