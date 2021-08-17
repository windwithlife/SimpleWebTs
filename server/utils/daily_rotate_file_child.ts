/**
 * ?开启一个子进程跑定时器逻辑，每到00:00时刻更新父进程的nowDateOfToday，实现日志分割。
 * ps -ef | grep  daily_rotate_file_child  | cut -c 8-12 | xargs kill
 */

import schedule from 'node-schedule';

// execute timed task at 00:00 in everyday.
schedule.scheduleJob('0 0 0 * * *',  async function(){
  process.send('It is early morning');
});

process.on('message', (msg) => {
  console.log(`Message from parent: ${msg}`)
});

process.on('disconnect',function(){
  console.log('disconnect-disconnect-disconnect-disconnect-disconnect');
})