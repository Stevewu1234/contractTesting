/* eslint-disable node/no-missing-import */
import { task } from 'hardhat/config';
import * as config from '../config';
import { getABI, readDeployedContractDetails } from '../utils';

task('test', 'just to find contract storage data')
  .addParam('action', 'select testing function')
  .setAction(async (args, hre) => {
    if (args === 'storage') {
      // data preparation
      const contractname = config.contractDetails.StorageTest.name;
      const address = readDeployedContractDetails(contractname).address;
      const abi = getABI(contractname);
      const provider = hre.ethers.provider;
      const contract = await new hre.ethers.Contract(address, abi, provider);

      // data reading
      const storageData = await hre.ethers.provider.getStorageAt(address, 2);
      const aValue = await contract.callStatic.a();

      console.log(aValue);
      console.log(storageData);
    }
  });
