# scheduler

  It can schedule a particular job after certain amount of time depends on priority
  ## Install 
    $ npm install job_scheduler
  ## Usage
  
  ```js
  var Scheduler = require("job_scheduler");
  var main = function () {
      var scheduler = new Scheduler(1000*60);  //This time indicates the interval time between the scheduler's two cycle
      scheduler.addLimit(10, 5); // This two numbers indicates the totalJobLimit and normalPriorityJobLimit to perform jobs for a cycle
      scheduler.start(); //This start function takes one argument, which indicates the interval time between two job. If nothing is provided, by default it is 500 milliseconds
  
      for (var count = 0; count <= 10; count++) {
          scheduler.addJob(new Date().toLocaleString(), function (time) {
              console.log("This is a low priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
          });
      }
  
      for (var count = 0; count <= 10; count++) {
          scheduler.addUrgentJob(new Date().toLocaleString(), function (time) {
              console.log("This is a high priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
          });
      }
  
      scheduler.addJob(new Date().toLocaleString(), function (time) {
          console.log("This is a low priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
      });
      scheduler.addUrgentJob(new Date().toLocaleString(), function (time) {
          console.log("This is a high priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
      });
      scheduler.addJob(new Date().toLocaleString(), function (time) {
          console.log("This is a low priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
      });
      scheduler.addUrgentJob(new Date().toLocaleString(), function (time) {
          console.log("This is a high priority job and scheduled at ", time, " and current time is ", new Date().toLocaleString());
      });
  };
  main();
  
```
  ## API
  ---
  #### new Scheduler([delay])
  ###### delay
  Type: `number` *(milliseconds)*
  Default: `3600000`
  
 `delay` holds the time in milliseconds indicates after how much time the scheduler will start.
  
  #### start([delay])
**delay**

Type: `number` *(milliseconds)*
    
Default: `500`
    
`delay` indicates the interval (seconds) between two job. It throws an error if limit is not already set.
     
  #### stop()
Its stop the scheduler and remove all the task.

  #### addJob(value,callback)
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Its add a normal/low priority job to scheduler.
  ##### value
  Type: `number, object, string`
  
  `value` holds the value which will pass to callback function
  ##### callback
  Type: `function`

`callback` is the function which will call with passed `value`
  
  #### addUrgentJob(value,callback)
 Its add a urgent/high priority job to scheduler.
 
##### value
   Type: `number, object, string`

`value` holds the value which will pass to callback function
    
##### callback
Type: `function`

`callback` is the function which will call with passed `value`

  #### addLimit(totalNumberOfJob [, normalJobLimit])
 Its generate limit for the scheduler perform job in a certain time. It throws an error if totalNumberOfJob is not provided.
  
  ##### totalNumberOfJob
  Type: `number`
  
 Indicates the total number of job can completed by this scheduler
  
  ##### normalJobLimit
Type: `number`

Default: `0`

Indicates the maximum number of normal job can completed by this scheduler

*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If number of job is greater than limit, it will not perform any job for some time and scheduler will auto restart after the same amount of time, passed when scheduler was created.*
