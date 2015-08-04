module.exports = function() {

	var roomList = [];

	var Room = function(id, streams) {
		this.id = id;
		//this.streams = streams;
	}

	return {
		createRoom : function(id, streams) {
			console.log('%s', id);
			console.log('%s', streams);
			//var room = new Room(id, streams);
			roomList.push(id);

			var c = roomList.indexOf(id);
			if (c > -1) {
				console.log('contains');
			} else {
				console.log('containts');
			}

			//if (roomList.indexOf(room) > -1) {
			//	console.log('%', "this room is created");
			//} else {
			//	if ()
			//	var room = new Room(id)
			//	roomList.push(room);
			//}
		},

		deleteRoom : function(id) {
			var index = 0;
			while (index < roomList.length && roomList[index].id != id ) {
				index++;
			}
			roomList.splice(index, 1);
		},

		update : function(id, name) {
			var room = roomList.find(function(element, i, array) {
				return element.id = id;
			});
		},

		getRooms : function() {
			return roomList;
		}
	}
};