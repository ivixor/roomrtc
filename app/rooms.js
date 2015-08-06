module.exports = function() {

	var roomList = [];

	var Room = function(name, streams) {
		this.name = name;
		this.streams = streams;
	}

	return {
		addRoom : function(name) {
			console.log('streams: %s', JSON.stringify(streams));

			roomList.push(name);

			//if (!containsObject(room, roomList) && roomList.length < roomSize) {
			//	roomList.push(room);
			//}
		},

		deleteRoom : function(name) {
			var index = 0;
			while (index < roomList.length && roomList[index].name != name ) {
				index++;
			}
			roomList.splice(index, 1);
		},

		update : function(name, streams) {
			var room = roomList.find(function(element, i, array) {
				return element.name = name;
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