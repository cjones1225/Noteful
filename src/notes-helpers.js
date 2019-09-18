export const findFolder = (folders = [], folderId) =>
  folders.find(folder => folder.id === folderId);

export const findNote = (Notes = [], noteId) =>
  Notes.find(note => note.id === noteId);

export const getNotesForFolder = (Notes = [], folderId) =>
  !folderId ? Notes : Notes.filter(note => note.folderId === folderId);

export const countNotesForFolder = (Notes = [], folderId) =>
  Notes.filter(note => note.folderId === folderId).length;
