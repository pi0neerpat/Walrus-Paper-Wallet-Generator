pragma solidity ^0.4.23;

contract Ownable {

  address public owner;

  constructor() public{
    owner = msg.sender;
  }
  modifier onlyOwner() {
    if (msg.sender != owner) {
      revert();
    }
    _;
  }
  function transferOwnership(address newOwner) public onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }
}

contract Token{
  function transferFrom(address from, address to, uint value) public returns (bool);
}

contract batch is Ownable{

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function changeOwner(address _newOwner) onlyOwner public {
        owner = _newOwner;
    }

    function multisendETH(address[] _to) public payable returns (bool _success) {
        uint splitAmount = msg.value / _to.length;
        for (uint i = 0; i < _to.length; i++) {
            _to[i].transfer(splitAmount);
        }
            return true;
    }

    function multisendToken(address _tokenAddr, address[] _to, uint _value, uint limit) public payable
    returns (bool _success) {
        require(_to.length <= limit);
        for (uint i = 0; i < _to.length; i++) {
            require((Token(_tokenAddr).transferFrom(msg.sender, _to[i], _value)) == true);
        }
            return true;
    }

    function reset() onlyOwner public {
        owner.transfer(address(this).balance);
    }

    function kill() onlyOwner public {
        selfdestruct(owner);
    }

}
