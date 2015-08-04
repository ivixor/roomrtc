module.exports = function() {

	var freeRoom = 0;
	var roomSize = 2;
	var roomList = [];

	var Room = function(streams) {
		this.id = ++freeRoom;
		this.streams = streams;
	}

	return {
		createRoom : function(streams) {
			console.log('%s', JSON.stringify(streams));

			var room = new Room(streams);
			if (!containsObject(room, roomList) && roomList.length < roomSize) {
				roomList.push(room);
			}
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

	function containsObject(obj, list) {
		var i;
		for (i = 0; i < list.length; i++) {
			var o = list[i]
			if (o.id == obj.id) {
				return true;
			}
		}
		return false;
	}
};