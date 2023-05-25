const chai = require('chai');
const expect = chai.expect;

// Getting Previous Answer
describe('Example Tests for Jenkins Check', function(){
    it('Checks if 1 + 1 = 2', (done)=>{
        expect(1+1).to.equal(2);
        done();
    });

    it('Checks is word = word', (done)=>{
        expect("test").to.equal("test");
        done();
    });
});

describe('Guaranteed Not-Fail Tests', function(){
    it('Checks if 9 + 10 = 19', (done)=>{
        expect(9+10).to.equal(19);
        done();
    });
});