// interface for file storage tasks for modifing data in the file
// like adding, removing, and updating data the interface should be
// dynamic so that it will have only the key for deleting and the key
// and value for adding and updating

interface ModifyTask {
    type: 'add'| 'update';
    key: string;
    value: string;
}

interface DeleteTask {
    type: 'delete';
    key: string;
}

export type StorageTask = ModifyTask | DeleteTask;
