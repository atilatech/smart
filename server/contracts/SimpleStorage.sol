// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

contract SimpleStorage {
    event StorageSet(string _message);

    uint public storedData;

    function set(uint x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }
}
