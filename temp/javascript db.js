function validateString(a,b){return true;}
let pool;
class Status{constructor(aa){}}


//JavaScript
function getEmail(username){
  return new Promise((resolve,reject)=>{
    if (!validateString(username, /[0-9a-z._-]/ig)){
      reject(new Status({status: 'rejected',
                         file: 'database.js',
                         func: 'getEmail()',
                         line: 13/*LL*/,
                         msg:"Invalid characters in 'username'. Allowed characters are 0-9, a-z, A-Z, and . _ -"}));
    }
    pool.query('SELECT username, email FROM users WHERE username = ?;', [username],
      (err,data)=>{
        if (err){
          reject(new Status({status:'error',
                             file:'database.js',
                             func: 'getEmail()',
                             line: 22/*LL*/,
                             msg: `pool.query threw an error, see .error for details`,
                             error: err}));
        }
        resolve(data);
    });
  });
}


