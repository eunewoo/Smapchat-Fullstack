/// Constructs a transaction handler for an object. You can use the createTrans,
/// deleteTrans, and updateTrans functions of this class to mutate the object, and
/// then use the undo and redo functions to undo/redo those mutations. any new mutation
/// will clear the redo list!
export default class TransactionHandler {

    /// Initialize the transaction handler to point to the object we're mutating
    /// also initialize the undo and redo lists
    constructor(obj) {
        this.undoList = [];
        this.redoList = [];
        this.obj = obj;
    }

    /// Build and execute a create transaction. The transaction is stored
    /// in the undo list, acts on the object parameter on the value
    /// specified by path, to insert the value described by newValue. path
    /// should point to an array.
    createTrans(path, newValue) {
        const trans = buildCreateTransaction(path, newValue);
        trans.do(this.obj);
        this.undoList.push(trans);
        this.redoList = [];
    }

    /// Build and execute a delete transaction. The transaction is stored
    /// in the undo list, acts on the object parameter on the value
    /// specified by path, to remove the value described by toRemove. path
    /// should point to an array.
    deleteTrans(path, toRemove) {
        const trans = buildDeleteTransaction(path, toRemove);
        trans.do(this.obj);
        this.undoList.push(trans);
        this.redoList = [];
    }

    /// Build and execute an update transaction. The transaction is stored
    /// in the undo list, acts on the object parameter on the value
    /// specified by path, to change the value to newValue.
    updateTrans(path, newValue) {
        const trans = buildUpdateTransaction(this.obj, path, newValue);
        trans.do(this.obj);
        this.undoList.push(trans);
        this.redoList = [];
    }

    /// undo the last transaction
    undo() {
        const trans = this.undoList.pop();
        trans.undo(this.obj);

        this.redoList.push(trans);
    }

    /// redo the last undone transaction. Cannot be done if a new transaction
    /// has occured after an undo.
    redo() {
        const trans = this.redoList.pop();
        trans.do(this.obj);

        this.undoList.push(trans);
    }
}

/// builds the transaction object for creating a new value and pushing it to an array
function buildCreateTransaction(path, newValue) {

    return {
        do: (obj) => {
            const ref = getRef(obj, path);
            ref.push(newValue);
        },

        undo: (obj) => {
            const ref = getRef(obj, path);
            // This is a really annoying way to do this but JS's nature of
            // how it handles object equality forces this or something similar
            const ind = ref.findIndex((val) => JSON.stringify(val) == JSON.stringify(newValue));
            ref.splice(ind, 1);
        }
    };
}

/// builds the transaction object for removing a value from an array
function buildDeleteTransaction(path, toRemove) {

    const oldValue = toRemove;

    return {
        do: (obj) => {
            const ref = getRef(obj, path);
            // This is a really annoying way to do this but JS's nature of
            // how it handles object equality forces this or something similar
            const ind = ref.findIndex((val) => JSON.stringify(val) == JSON.stringify(toRemove));
            ref.splice(ind, 1);
        },

        undo: (obj) => {
            const ref = getRef(obj, path);
            ref.push(oldValue);
        }
    }
}

/// builds the transaction object for changing a value on the object somewhere
function buildUpdateTransaction(obj, path, newValue) {

    const oldRef = getRefPrimitive(obj, path);
    const oldValue = oldRef.ref[oldRef.key];

    return {
        do: (obj) => {
            const ref = getRefPrimitive(obj, path);
            ref.ref[ref.key] = newValue;
        },

        undo: (obj) => {
            const ref = getRefPrimitive(obj, path);
            ref.ref[ref.key] = oldValue;
        }
    }
}

/// Parses through a string path to access a deeper ref on an object.
/// Used to grab the values in an extremely generic way for undo/redo.
function getRef(obj, path) {

    const pathParts = path.split('.');
    var latest = obj;

    for (const pathIndex in pathParts) {
        var key = pathParts[pathIndex];

        if (key.endsWith(']'))
        {
            var split = key.split('[');
            key = split[0];
            console.log(key);
            const index = parseInt(split[1]);

            latest = latest[key];
            latest = latest[index];
        }
        else
        {
            latest = latest[key];
        }
    }

    console.log("getRef returned: " + latest);
    return latest;
}

/// Special case for primitives which cant be passed by refferecnce,
/// so we have to go one level up to their containing object.
function getRefPrimitive(obj, path) {

    const pathParts = path.split('.');
    var latest = obj;
    var lastKey = '';

    for (const pathIndex in pathParts) {
        var key = pathParts[pathIndex];

        if (key.endsWith(']'))
        {
            var split = key.split('[');
            key = split[0];
            const index = parseInt(split[1]);

            latest = latest[key];
            if (pathIndex != pathParts.length - 1)
            {
                latest = latest[index];
            }
            else
            {
                lastKey = index;
            }
        }
        else
        {
            if (pathIndex != pathParts.length - 1)
            {
                latest = latest[key];
            }
            else
            {
                lastKey = key;
            }
        }
    }

    console.log("getRefPrimitive returned: " + latest + " " + lastKey);
    return {"ref": latest, "key" : lastKey};
}

export function test() {

    const map = {
        "MapID" : "1234TEST1234",
        "Maxpin" : 5,
        "Location" : [
            {
                "Name" : "New York",
                "Longitude" : 0.56,
                "Lattitude" : 0.48,
                "Order" : 0,
                "Date" : "1-1-1970"
            },
            {
                "Name" : "Cool area",
                "Longitude" : 0.66,
                "Lattitude" : 0.48,
                "Order" : 1,
                "Date" : "1-2-1970"
            },
            {
                "Name" : "Mountain view",
                "Longitude" : 0.56,
                "Lattitude" : 0.28,
                "Order" : 2,
                "Date" : "1-4-1970"
            },
            {
                "Name" : "Great resteraunt",
                "Longitude" : 0.26,
                "Lattitude" : 0.28,
                "Order" : 3,
                "Date" : "1-4-1970"
            },
            {
                "Name" : "Home",
                "Longitude" : 0.76,
                "Lattitude" : 0.88,
                "Order" : 4,
                "Date" : "1-5-1970"
            }
        ]
    }

    const mapHandler = new TransactionHandler(map);

    mapHandler.updateTrans("Maxpin", 6);
    console.log(JSON.stringify(map));
    mapHandler.updateTrans("Maxpin", 7);
    console.log(JSON.stringify(map));
    mapHandler.undo();
    console.log(JSON.stringify(map));
    mapHandler.createTrans("Location", {
        "Name" : "Accident!",
        "Longitude" : 0.0,
        "Lattitude" : 0.0,
        "Order" : 17,
        "Date" : "1-1-1970"
    });
    console.log(JSON.stringify(map));
    mapHandler.undo(map);
    console.log(JSON.stringify(map));
    mapHandler.updateTrans("Location[0].Name", "Hamburger");
    console.log(JSON.stringify(map));
    mapHandler.undo(map);
    console.log(JSON.stringify(map));
    mapHandler.redo(map);
    console.log(JSON.stringify(map));
}