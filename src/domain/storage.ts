const DATABASE_NAME = 'changan-learning-courseware';
const STORE_NAME = 'progress';
const RECORD_KEY = 'child-profile';
const LOCAL_BACKUP_KEY = 'changan-learning-progress';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readIndexedDb(): Promise<unknown | null> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(RECORD_KEY);
    const value = await requestToPromise(request);
    return value ?? null;
  } finally {
    database.close();
  }
}

async function writeIndexedDb(value: unknown): Promise<void> {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const request = transaction.objectStore(STORE_NAME).put(value, RECORD_KEY);
    await requestToPromise(request);
  } finally {
    database.close();
  }
}

function readLocalBackup(): unknown | null {
  const raw = localStorage.getItem(LOCAL_BACKUP_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function writeLocalBackup(value: unknown): void {
  localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(value));
}

export async function loadProgress(): Promise<unknown | null> {
  if (typeof indexedDB === 'undefined') {
    return readLocalBackup();
  }
  try {
    const value = await readIndexedDb();
    return value ?? readLocalBackup();
  } catch {
    return readLocalBackup();
  }
}

export async function saveProgress(value: unknown): Promise<void> {
  writeLocalBackup(value);
  if (typeof indexedDB === 'undefined') return;
  try {
    await writeIndexedDb(value);
  } catch {
    // localStorage remains the recovery copy when IndexedDB is unavailable.
  }
}
