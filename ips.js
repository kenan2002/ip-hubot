// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
const os = require('os');
const ifaces = os.networkInterfaces();

function ips() {
  let ret = '';

  Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        ret += `${ifname}:${alias} ${iface.address}\n`;
      } else {
        // this interface has only one ipv4 adress
        ret += `${ifname} ${iface.address}\n`;
      }
      ++alias;
    });
  });

  return ret;
}

module.exports = ips;
