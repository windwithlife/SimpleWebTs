import handler from 'serve-handler';
import * as http from "http";
import deployConfig from "../deploy.config.json";
const logCategoryPath:string  = deployConfig.production.pm2_log_path_prefix;



const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response,{
    public:logCategoryPath
  });
})

server.listen(3002, () => {
  console.log('Running at http://localhost:3002');
});