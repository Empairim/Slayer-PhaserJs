//@ts-nocheck
export default class ObjectPool {
	constructor(createObject, scene, maxPoolSize = 50) {
		this.createObject = createObject;
		this.scene = scene;
		this.maxPoolSize = maxPoolSize;
		this.active = [];
		this.inactive = [];
	}

	request(x, y) {
		let object;
		// If there are inactive objects in the pool, return one of those
		if (this.inactive.length > 0) {
			object = this.inactive.pop();
			this.scene.add.existing(object); // Add the object back to the scene
			console.log('Reusing inactive object. Inactive count:', this.inactive.length);

			// If there are no inactive objects in the pool, create a new object
		} else {
			object = this.createObject();
			this.scene.add.existing(object);
			console.log('Creating new object. Active count:', this.active.length);
		}
		// Add the object to the active array weahter it was created or pulled from the inactive array
		this.active.push(object);
		object.reset(x, y);

		return object;
	}

	release(object) {
		// Check if the object is in the active array
		const index = this.active.indexOf(object);
		// If the object is in the active array, remove it and add it to the inactive array
		if (index !== -1) {
			// Remove the object from the active array
			this.active.splice(index, 1);
			// Add the object to the inactive array to be reused
			this.inactive.push(object);
			console.log('Releasing object. Active count:', this.active.length, 'Inactive count:', this.inactive.length);
		}
	}
}

//first attempt at object pooling.
//So we have 2 arrays active and inactive.
//Checks if anything is in inactive if it is will add it to active array. and if active array is less than maxPoolSize it will create a new object and add it to active array. then return the object.
//If not it will create a new object and add it to active array.
//Then when we release the object it will remove it from active array and add it to inactive array.
//Then it will loop around and check if something is in inactive array and if it is it will use that instead of creating a new one and add it to active array.
