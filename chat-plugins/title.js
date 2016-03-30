/**
  * Title plugin for showdown that appears in the profile while doing /profile
   * Plugin developed by ~MasterCris
   **/
'use strict';

let fs = require('fs');
let path = require('path');

// log when a title is set
function logTitle(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/about.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}

exports.commands = {
	givetitle: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givetitle');

		let parts = target.split(',');
		let username = toId(parts[0]);
		let title = parts.slice(1).join(", ").trim();

		if (!title.length || title.length > 100) return this.errorReply("The title must be between 1 and 100 characters long.");

		Db('about').set(username, title);
		
		this.sendReply(username + " was given " + title + ". ");
		if (Users.get(username)) Users(username).popup(user.name + " has given you the title: ||||" + title);
		logTitle(username + " was given the title \"" + title + "\" by " + user.name + ".");
	},
	givetitlehelp: ["/givetitle [user], [title] - Give a user a Title."],
};
