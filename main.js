let souls = 0
let soulsPerHarvest = 0
let totalSoulsHarvested = 0

let upgrades = [
    {
        name: 'sharpenScythe',
        price: 50,
        quantity: 0,
        multiplier: 5,
        img: 'ASSETS/sharpen.png'
    },
    {
        name: 'extraBlade',
        price: 500,
        quantity: 0,
        multiplier: 20,
        img: 'ASSETS/blade.png'
    }
]

let automaticUpgrades = [
    {
        name: 'headsman',
        price: 1000,
        quantity: 0,
        multiplier: 10,
        img: 'ASSETS/headsman.png'

    },
    {
        name: 'gallows',
        price: 2500,
        quantity: 0,
        multiplier: 50,
        img: 'ASSETS/gallows.png'
    }
]

function collectAutomaticMulipliers() {
    automaticUpgrades.forEach(item =>
        souls += (item.multiplier * item.quantity)
    )
}

function harvest() {
    souls += (1 + soulsPerHarvest)
    totalSoulsHarvested += 1
    updateScore()
}

function updateScore() {
    let scoreBoardElem = document.getElementById("scoreBoard")
    scoreBoardElem.innerHTML = `<h3>Souls: ${souls} </h3>`
}


function updateShop() {
    updateScore()
    let template = ''
    upgrades.forEach(item =>
        template += `<div class="col-3 my-3  mw-50">
        <div>
            <span class="tooltip-box">
            ${item.name}
            </span>
            <div class="tooltip-text hidden" id="${item.name}">
                <span>
                Increases souls collected by ${item.multiplier}.
                </span>
            </div>
        </div>
        <img class="purchaseable flex-column" src="${item.img}" alt="${item.name}" onclick = "purchaseUpgrade(${upgrades.indexOf(item)})" onmouseenter="reveal('${item.name}')" onmouseleave="conceal('${item.name}')">
        <span>Price: ${item.price}  </span><span class="price-tag">Owned: ${item.quantity} </span></div>`
    )
    automaticUpgrades.forEach(item =>
        template += `<div class="col-3 my-3  mw-50">
            <div>
                <span class="tooltip-box">
                ${item.name}
                </span>
                <div class="tooltip-text hidden" id="${item.name}">
                    <span>
                    Automatically collects ${item.multiplier} souls every 3 seconds.
                    </span>
                 </div>
            </div>
            <img class="purchaseable flex-column" src="${item.img}" alt="${item.name}" onclick = "purchaseAutomaticUpgrade(${automaticUpgrades.indexOf(item)})" onmouseenter = "reveal('${item.name}')" onmouseleave="conceal('${item.name}')">
            <span>Price: ${item.price}  </span>
            <span class="price-tag">Owned: ${item.quantity} </span>
        </div>`
    )

    let upgradeShopElem = document.getElementById('upgradeShop')
    upgradeShopElem.innerHTML = template

}

function startGame() {
    updateScore()
    updateShop()
}

function purchaseUpgrade(i) {
    let cost = upgrades[i].price
    if (souls >= cost) {
        upgrades[i].price = (cost * 1.5)
        upgrades[i].quantity += 1
        souls -= cost
        soulsPerHarvest += upgrades[i].multiplier
        updateShop()
    }
    else { alert('You do not have enough souls') }
}
function purchaseAutomaticUpgrade(i) {
    let cost = automaticUpgrades[i].price
    if (souls >= cost) {
        automaticUpgrades[i].price = (cost * 1.5)
        automaticUpgrades[i].quantity += 1
        souls -= cost
        updateShop()
        startInterval()
    }
    else { alert('You do not have enough souls') }
}

function startInterval() {
    let autoHarvestInterval = setInterval(collectAutomaticMulipliers, 3000)
    let scoreUpdateInterval = setInterval(updateScore, 3000)
}

function reveal(name) {
    let item = document.getElementById(name)
    item.classList.remove("hidden")
}

function conceal(name) {
    let item = document.getElementById(name)
    item.classList.add("hidden")
}


