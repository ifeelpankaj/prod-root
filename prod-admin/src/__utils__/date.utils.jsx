export const formatDocumentName = (docName) => {
    if (!docName) return 'Unknown Document';
    return docName
        .replace('undefined_', '')
        .replace(/([A-Z])/g, ' $1')
        .trim();
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
