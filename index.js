const bearychat = require('bearychat');
const RTMClient = require('bearychat-rtm-client');
const RTMClientEvents = RTMClient.RTMClientEvents;
const WebSocket = require('ws');
const ip = require('ip');
const ips = require('./ips');

const token = process.env.BEARYCHAT_HUBOT_TOKEN;

const client = new RTMClient({
    url: function () {
        return bearychat.rtm.start({ token })
            .then(function (resp) { return resp.json() })
            .then(function (data) { return data.ws_host });
    },
    WebSocket: WebSocket
});

client.on(RTMClientEvents.ONLINE, function () {
    console.log('RTM online');
});

client.on(RTMClientEvents.OFFLINE, function () {
    console.log('RTM offline');
});

client.on(RTMClientEvents.EVENT, function (message) {
    if (message.type === 'message') {
        const text = message.text || '';
        if (text.toLowerCase() === 'ip') {
            client.send({
                type: 'message',
                vchannel_id: message.vchannel_id,
                text: ip.address(),
            });
        }

        if (text.toLowerCase() === 'ips') {
          client.send({
            type: 'message',
            vchannel_id: message.vchannel_id,
            text: ips(),
          });
        }
    }
});
