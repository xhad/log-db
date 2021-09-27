const { expect } = require("chai");
const { ethers } = require("hardhat");

const getStorage = async (address, contract) => {
  const filter = await contract.filters.DataEvent(address);
  const events = await contract.queryFilter(filter);
  return events.map(event => (
    { sender: event.args.sender, data: event.args.data })
  )
};

let eventStore, address

before(async () => {
  const LogDB = await ethers.getContractFactory('LogDB');
  eventStore = await (await LogDB.deploy()).deployed()

  address = await ethers.provider.getSigner(0).getAddress()
})

describe("Call LogDB", function() {

  it ("Should save data to the log", async function () {

    const data = [
      // the contract to associate metadata
      '0x54241ac4bd04f4bd5690edfc90464b854432544c',

      // arrays of key / values
      [
        'poolName',
        'Some Pool Name'
      ],
      [
        'poolDescription',
        'The pool will pull money out of the air with magic code.'
      ],
      [
        'company',
        'Alameda Research'
      ],
      [
        'twitter',
        '@alameda'
      ],
      [
        'poolDescription',
        'The pool will pull money out of the air with magic code.'
      ]
    ]

    await(await eventStore.storeData(JSON.stringify(data))).wait()
    
    const storage = await getStorage(address, eventStore);

    expect(storage.sender === address)

    console.log(storage)
  })
})
