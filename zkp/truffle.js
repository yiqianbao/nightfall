module.exports = {
    // Uncommenting the defaults below 
    // provides for an easier quick-start with Ganache.
    // You can also follow this format for other networks;
    // see <http://truffleframework.com/docs/advanced/configuration>
    // for more details on how to specify configuration options!
    //
    networks: {
      development: {
        host: "172.17.0.1",
        port: 8545,
        from: "0x4c34Ac28a0707cF3289e288126452Fcb5A03830e",
        gas: 4612388,
        gasPrice: 0,
        network_id: 999
      },
      compilers: {
        solc: {
          version: "0.5.0"
        }
      }
      /*test: {
        host: "127.0.0.1",
        port: 8545,
        from: "0xf0f1d220d02e46938efb2f6515cb6bf75bdd5563",
        gas: 4612388,
        network_id: 999
      }*/
    }
  };
  