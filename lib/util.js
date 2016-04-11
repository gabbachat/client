'use strict';

const crypto = require('crypto');

module.exports = {

  encrypt: function(text, security) {
    console.log('encrypt');
    return new Promise(function(resolve, reject) {
      crypto.pbkdf2(text, security.salt, security.iterations, security.length, security.digest, (err, key) => {
        if (err) reject(err);
        resolve(key.toString('hex'));
      });
    });
  },

  encryptSync: function(text, security) {
    const key = crypto.pbkdf2Sync(text, security.salt, security.iterations, security.length, security.digest);
    return key.toString('hex');
  },

  checkPassword: function(a, b) {
    return new Promise(function(resolve, reject) {
      encrypt(a, security).then(function(aHex) {
        console.log('encrypt a');
          encrypt(b, security).then(function(bHex) {
            console.log('encrypt b');
            if (aHex === bHex) {
              console.log('match');
              resolve(true);
            } else {
              console.log('do not match');
              resolve(false);
            }
          }).catch(reject(err));
        }).catch(reject(err));
    });
  },

  checkPasswordSync: function(a, b) {
    let original = encryptSync(client.get.params.method, security);
    let verify = encryptSync('local', security);
    if (original === verify) return true;
    return false;
  },

  server : {
    error: function(app) {
      console.log('SERVER ERROR');
      app.get('gabba').inform(app, 'error', err);
    },
    start: function(app) {
      const gabba = app.get('gabba');
      app.server = app.listen( process.env.PORT || 1981, function( err ) {
        if ( !err ) {
          gabba.inform(app, 'done');
        } else {
          gabba.inform(app, 'error', err);
        }
      });

      // HANDLE UNCAUGHT ERRORS
      process.on('uncaughtException', function(err) {
        if(err.errno === 'EADDRINUSE') { gabba.inform(app, 'eaddr');}
        else {gabba.inform(app, 'error', err);}
        process.exit(1);
      });

    }
  },

  // APPLY TITLE CASING
  titleCase: function(str) {
    var newstr = str.split(" ");
    for(let i=0;i<newstr.length;i++){
      let copy = newstr[i].substring(1).toLowerCase();
      newstr[i] = newstr[i][0].toUpperCase() + copy;
    }
     newstr = newstr.join(" ");
     return newstr;
  }
};
