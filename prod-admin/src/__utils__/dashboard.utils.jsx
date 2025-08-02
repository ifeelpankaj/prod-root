export const revenueViewer = (revenue) => {
    if (revenue >= 1000 && revenue < 1000000) {
        return revenue % 1000 === 0 ? `${revenue / 1000}K` : `${(revenue / 1000).toFixed(1)}K`;
    }
    if (revenue >= 1000000 && revenue < 1000000000) {
        return revenue % 1000000 === 0 ? `${revenue / 1000000}M` : `${(revenue / 1000000).toFixed(1)}M`;
    }
    if (revenue >= 1000000000) {
        return revenue % 1000000000 === 0 ? `${revenue / 1000000000}B` : `${(revenue / 1000000000).toFixed(1)}B`;
    }
    return revenue;
};
