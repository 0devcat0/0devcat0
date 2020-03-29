describe("NearPlace", function() {
  let contract;
  let accountId;

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Contains all the steps that are necessary to
  //    establish a connection with a dev instance
  //    of the blockchain.
  beforeAll(async function() {
    near = await nearlib.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(accountId, {
      // NOTE: This configuration only needed while NEAR is still in development
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["getMap"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["setCoords"],
      sender: nearConfig.contractName
    });
    window.near = near;
  });

  describe("getMap", function() {
    it("can get the board state", async function() {
      const viewResult = await contract.getMap();
      expect(viewResult.length).toBe(100); // board is 10 by 10
    });
  });

  // ---> in the next step INSERT the setCoords "describe block" here <---
  describe("setCoords", function() {
  it("modifies the board state", async function() {
    const setResult = await contract.setCoords({
      coords: "0,0",
      value: "111111"
    });
    console.log(setResult);
    const viewResult = await contract.getMap();
    expect(viewResult.length).toBe(100); // board is 10 by 10
    // entry 0,0 should be 111111!
    expect(viewResult[0]).toBe("111111")
  });
});
});