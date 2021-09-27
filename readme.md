## Ethereum Log DB

Just emit an event to store metadata associated with a given contract address. See the test for an example.

```
npm i
npm run node
# new terminal
npm run compile
npm run deploy
npm run test
```

Log DB is just an event where you can pass in some data to associated with a contract. The following is an example event log with data strcutured as:

[ {some contact address}, [ {key}, {value} ]...]

```
[
  {
    sender: '0xa0b30De2833294C200a376B0e8205b9517bF021F',
    data: '[
      "0x54241ac4bd04f4bd5690edfc90464b854432544c",
      ["name","John Doe"],
      ["companyName","Acme Research, LLC"],
      ["twitter","@acmeresearch"],
      ["website","https://acmeresearch.com"],
      ["aboutCompany","Acme Research will pull money out of the air with magic code."]
    ]'
  }
]
```
