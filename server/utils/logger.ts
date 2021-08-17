import winston from "winston";
// require('winston-daily-rotate-file');
import * as fecha from 'fecha';
import deployConfig from "../../deploy.config.json";
import { fork } from "child_process";
import path from "path";


const { createLogger, format, transports } = winston;
const NODE_ENV = process.env.NODE_ENV;


function getNowDateOfToday() {
  return fecha.format(new Date(), 'YYYY-MM-DD');
}


let error_log_file_path, info_log_file_path, exception_log_file_path, rejection_log_file_path, winston_log_path_prefix;


function setFilePathForWinston(nowDateOfToday:string):void{
  switch (NODE_ENV) {
    case 'production':
      winston_log_path_prefix = deployConfig.production.winston_log_path_prefix;
      error_log_file_path = `${winston_log_path_prefix}error/error_${nowDateOfToday}.log`
      info_log_file_path = `${winston_log_path_prefix}info/info_${nowDateOfToday}.log`
      exception_log_file_path = `${winston_log_path_prefix}exception/exception_${nowDateOfToday}.log`
      rejection_log_file_path = `${winston_log_path_prefix}rejection/rejection_${nowDateOfToday}.log`
      break;
    // @ts-ignore
    case 'test':
      winston_log_path_prefix = deployConfig.mockpro.winston_log_path_prefix;
      error_log_file_path = `${winston_log_path_prefix}error/error_${nowDateOfToday}.log`
      info_log_file_path = `${winston_log_path_prefix}info/info_${nowDateOfToday}.log`
      exception_log_file_path = `${winston_log_path_prefix}exception/exception_${nowDateOfToday}.log`
      rejection_log_file_path = `${winston_log_path_prefix}rejection/rejection_${nowDateOfToday}.log`
      break;
  }
}

const logger = createLogger({
  transports: [],
});

if (process.env.NODE_ENV == 'development') {
  const consoleTransPort = new winston.transports.Console({
    level: 'silly',
    format: format.combine(
      format.colorize({ all: true }),
      format.simple()
    )
  })
  logger.add(consoleTransPort)
} else {
  try {
    setFilePathForWinston(getNowDateOfToday());
    dailyRotateFileChild();
    addYourTransport();
  } catch (error) {
    // log error info to error.log file.
    console.error(error);
  }
}

/**
  * fork一个子进程做定时任务，更新文件名
  */
function dailyRotateFileChild(): void {
  const timeSchedule = fork(path.join(__dirname, "./daily_rotate_file_child"));
  timeSchedule.send('start child process for update nowDateOfToday variable.');

  // The 'close' event is emitted when the stdio streams of a child process have been closed. This is distinct from the 'exit' event, since multiple processes might share the same stdio streams.
  timeSchedule.on('close',(code:number,signal:string)=>{
    console.trace(`${getNowDateOfToday()} close: `, code,signal);
  })

  // The 'exit' event may or may not fire after an error has occurred. When listening to both the 'exit' and 'error' events, guard against accidentally invoking handler functions multiple times.
  timeSchedule.on('error',(error)=>{
    console.trace(`${getNowDateOfToday()} error: `, error);
  })

  /**
   * The 'exit' event is emitted after the child process ends. If the process exited, code is the final exit code of the process, otherwise null.
   * If the process terminated due to receipt of a signal, signal is the string name of the signal, otherwise null. One of the two will always be non-null.
   * When the 'exit' event is triggered, child process stdio streams might still be open.
   */
  timeSchedule.on('exit',(code:number,signal:string)=>{
    console.trace(`${getNowDateOfToday()} exit: `, code,signal);
  })

  timeSchedule.on('message', message => {
    console.trace(`${getNowDateOfToday()} message: `, message);
    setFilePathForWinston(getNowDateOfToday());
    addYourTransport();
  });
}
/**
 * 添加transport
 */
function addYourTransport():void{
  logger.clear(); //remove all transports
  const commonFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
    winston.format.json(),
  )
  const fileFormatOfErrorLevel = new winston.transports.File({
    level: "error",
    filename: `${error_log_file_path}`,
    format: commonFormat
  });
  const fileFormatOfInfoLevel = new winston.transports.File({
    level: "info",
    filename: `${info_log_file_path}`,
    format: commonFormat
  });
  logger.exceptions.handle(
    new transports.File({ filename: exception_log_file_path })
  );

  //@ts-ignore
  logger.rejections.handle(
    new transports.File({ filename: rejection_log_file_path })
  );
  // add transport
  logger.add(fileFormatOfErrorLevel).add(fileFormatOfInfoLevel);
}

export default logger;

// logger.error('error');
// logger.warn('warn.');
// logger.info('info.');
// logger.http('http.');
// logger.verbose('verbose');
// logger.debug('debug.');
// logger.silly('silly');

/**
 * 针对使用console打出来的日志，我们一般都认为是系统日志，默认的我们会写入到pm2这个目录下
 * 针对使用logger打印的日志，我们认为是自定义日志，默认的我们会打印到winston这个目录下
 */

/**
 * 针对development环境下，使用logger下的各种方法只会把日志打印到console
 * 针对production,test环境下，使用looger下的error方法会把日志打印到error_log_file_path文件中，使用error warn info等方法会把日志打印到info_log_file_path中。其余不做处理
 * 针对node process unexception打印日志到exception_log_file_path
 * 针对promise Rejections打印日志到rejection_log_file_path
 * 日志记录以天为单位进行分割
 *
 * test环境是用来模拟生产环境的一个本地环境
 * 1、test环境下的日志打印地址和生产不同
 * 2、test环境下不做auth check
 */


