/**
  * Title plugin for showdown that appears in the profile while doing /profile
   * Plugin developed by ~MasterCris
   **/
   
   

'use strict';

let fs = require('fs');
let path = require('path');



/**
*About
*TiTle Brain 
*/


function isTitle(title) {
	let numTitle = Number(title);
	if (isNaN(title)) return "Must be a number.";
	if (String(title).includes('.')) return "Title Cannot contain a decimal.";
	if (numTitle < 1) return "Cannot be less than one letter.";
	return numTitle;
}

function logTitle(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/title.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}

	/*
	*end
	*/

	exports.commands = {

	givetitle: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givetitle');

		let parts = target.split(',');
		let username = parts[0];
		let about = isTitle(parts[1]);

		if (typeof about === 'string') return this.errorReply(about);

		let total = Db('title').set(toId(username), Db('title').get(toId(username), 0) + about).get(toId(username));
		about = about ;
		total = total ;
		this.sendReply(username + " was given " + about + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has given you " + about + ". You now have " + total + ".");
		logTitle(username + " was given " + about + " by " + user.name + ". " + username + " now has " + total);
	},
	givetitlehelp: ["/givetitle [user], [title] - Give a user a Title."],

};
