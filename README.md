# scheduler

  It can schedule a particular job after certain amount of time
  
  Its take one argument during creating new scheduler. This arguments is a non-zero integer which holds the time in seconds indicates after how much time the scheduler will start. By default is time is one hour.
  
  Its has the following methods-
    * start - Its take a parameter which indicates the interval (seconds) of process a job. It throws an error if limit is not already set. 
    * stop - Its stop the scheduler and remove all the task.
    * addJob - Its add a normal/low priority job to scheduler .Its take two argument value and callback function. This callback function will be called with the passed value after a certain time depends on priority
    * addUrgentJob - Its add a urgent/high priority job to scheduler .Its take two argument value and callback function. This callback function will be called with the passed value after a certain time depends on priority
    * addLimit - Its generate limit for the scheduler perform job in a certain time. Its take two argument - totalNumberOfJob and normalJobLimit  .It throws an error if total limit is not provided.
                 If number of job is greater than limit, it will not perform any job for some time and scheduler will auto restart after the same amount of time, passed when scheduler was created.