var fs = require('fs');

function loadDevs() {
	try {
		Users.devs = JSON.parse(fs.readFileSync('config/Devs.json', 'utf8'));
	} catch (e) {
		Users.devs = {};
	}
}
if (!Users.devs) loadDevs();

function saveDevs() {
	fs.writeFileSync('config/Devs.json', JSON.stringify(Users.devs));
}

exports.commands = {
	givedev: function (target, room, user) {
		if (!this.can('givedev')) return false;
		if (!target) return this.sendReply("Usage: /givedev [user]");
		if (Users.devs[toId(target)]) return this.sendReply(target + " already has the status.");
		var targetUser = Users(target);

		if (!targetUser) return this.sendReply("User \"" + target + "\" not found.");
		if (!targetUser.connected) return this.sendReply(targetUser.name + " is not online.");
		if (!targetUser.registered) return this.sendReply(targetUser.name + " is not registered.");

		Users.devs[targetUser.userid] = 2;
		targetUser.popup("You have received Dev status from " + user.name);
		this.privateModCommand("(" + user.name + " has given Dev status to " + targetUser.name + ")");
		saveDevs();
	},

	takedev: function (target, room, user) {
		if (!this.can('givedev')) return false;
		if (!target) return this.sendReply("Usage: /takedev [user]");
		if (!Users.devs[toId(target)]) return this.sendReply("User \"" + target + "\" is not a Dev.");

		delete Users.devss[toId(target)];
		saveDevs();
		this.privateModCommand("(" + user.name + " has removed Dev status from " + target + ")");
	},
};
