import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('database put');

  const jateDb = await openDB('jate', 'readwrite');

  const tx = jateDb.transaction('jate', 1);

  const store = tx.objectStore('jate');

  const request = store.put({ content: content });

  const result = await request;
  console.log('database saved new', result);
};

export const getDb = async () => {
  console.log('get from database');

  const jateDb = await openDB('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
