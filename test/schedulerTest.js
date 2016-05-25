var Scheduler = require('../lib/scheduler.js');
var assert = require('assert');

describe("addJob",function(){
	it("create a normal job and schedule it and return queue length",function(){
		var scheduler = new Scheduler();
		scheduler.addJob(67,function(){});
		scheduler.addJob(60,function(){});
		scheduler.addJob(61,function(){});
		assert.equal(scheduler.length,3);
		scheduler.addJob(37,function(){});
		scheduler.addJob(907,function(){});
		scheduler.addJob(607,function(){});
		assert.equal(scheduler.length,6);
	});
});
describe("addUrgentJob",function(){
	it("create a normal job and schedule it and return queue length",function(){
		var scheduler = new Scheduler();
		scheduler.addUrgentJob(67,function(){});
		scheduler.addUrgentJob(60,function(){});
		scheduler.addUrgentJob(61,function(){});
		assert.equal(scheduler.length,3);
		scheduler.addUrgentJob(37,function(){});
		scheduler.addUrgentJob(907,function(){});
		scheduler.addUrgentJob(607,function(){});
		assert.equal(scheduler.length,6);
	});
});
describe("start",function(){
	it("start the scheduler",function(done){
		var scheduler = new Scheduler();
		this.timeout(7000);
		scheduler.addLimit(20,10);
		scheduler.addJob(89,function(){});
		scheduler.addUrgentJob(890,function(){});
		scheduler.addJob(819,function(){});
		scheduler.addUrgentJob(891,function(){});
		scheduler.addJob(839,function(){});
		scheduler.start(1000);
		setTimeout(scheduler.stop,3400);
		setTimeout(function(){assert.equal(scheduler.length,2);
			done();
		},3400);
	});
	it("throws a error if totalLimit is not already set",function(done){
		var scheduler = new Scheduler();
		this.timeout(3000);
		setTimeout(function(){
			assert.throws(function () {
				scheduler.start(1000);
			}, /Total limit is not already set. For more information, see readme.md/);
			done();
		},1500);
	});
	it("stop the scheduler when there is no job remaining",function(done){
		var scheduler = new Scheduler();
		this.timeout(7000);
		scheduler.addLimit(20,10);		
		scheduler.addJob(89,function(){});
		scheduler.addUrgentJob(890,function(){});
		scheduler.addJob(819,function(){});
		scheduler.addUrgentJob(891,function(){});
		scheduler.addJob(839,function(){});
		scheduler.start();
		setTimeout(scheduler.stop,3400);
		setTimeout(function(){assert.equal(scheduler.length,0);
			done();
		},3400);
	});
	it("stop the scheduler when there is no request remaining",function(done){
		var scheduler = new Scheduler(5000);
		this.timeout(17000);
		scheduler.addLimit(2,1);		
		scheduler.addJob(89,function(){});
		scheduler.addUrgentJob(890,function(){});
		scheduler.addJob(819,function(){});
		scheduler.addUrgentJob(891,function(){});
		scheduler.addJob(839,function(){});
		scheduler.start(1000);
		setTimeout(function(){assert.equal(scheduler.length,1);
			done();
		},10000);	
	});
});
describe("length",function(){
	it("gives the length of pre-created queue",function(){
		var scheduler = new Scheduler();
		scheduler.addJob(89,function(){});
		scheduler.addUrgentJob(890,function(){});
		scheduler.addJob(819,function(){});
		scheduler.addUrgentJob(891,function(){});
		scheduler.addJob(839,function(){});
		assert.equal(scheduler.length,5);
	});
});
describe("addLimit",function(){
	it("throws a error if totalLimit is not provided",function(){
		var scheduler = new Scheduler();
		assert.throws(function () {
			scheduler.addLimit();
		}, /Total limit is not provided. For more information, see readme.md/);
	});
});
