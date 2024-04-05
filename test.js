// test/AdvancedStorage.test.js
const { expect } = require("chai");

describe("AdvancedStorage", function () {
  let AdvancedStorage;
  let advancedStorage;
  let owner;

  beforeEach(async function () {
    AdvancedStorage = await ethers.getContractFactory("AdvancedStorage");
    advancedStorage = await AdvancedStorage.deploy();
    await advancedStorage.deployed();
    [owner] = await ethers.getSigners();
  });

  it("Should add an item and emit an event", async function () {
    await expect(advancedStorage.addItem("Item 1", 100))
      .to.emit(advancedStorage, "ItemAdded")
      .withArgs("Item 1", 100);
  });
// lfg
  it("Should update total supply and emit an event", async function () {
    await expect(advancedStorage.updateTotalSupply(1000))
      .to.emit(advancedStorage, "TotalSupplyUpdated")
      .withArgs(1000);
  });

  it("Should return the correct item count", async function () {
    await advancedStorage.addItem("Item 1", 100);
    await advancedStorage.addItem("Item 2", 200);
    const count = await advancedStorage.getItemCount();
    expect(count).to.equal(2);
  });

  it("Should return the correct item details", async function () {
    await advancedStorage.addItem("Item 1", 100);
    await advancedStorage.addItem("Item 2", 200);
    const [name, quantity] = await advancedStorage.getItem(1);
    expect(name).to.equal("Item 2");
    expect(quantity).to.equal(200);
  });

  it("Should revert if trying to access out-of-bounds item", async function () {
    await expect(advancedStorage.getItem(10)).to.be.revertedWith("Index out of bounds");
  });
});
